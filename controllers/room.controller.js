const db = require('../models/relation.model');

const Room = db.Room;
const Apartment = db.Apartment
const Furniture = db.Furniture;

addRoom = function (req, res) {
    return Apartment
        .findByPk(req.body.apartmentId)
        .then(apartment => {
            if (!apartment) {
                return res.status(400).send({
                    message: 'Apartment Not Found',
                });
            }

            return Room
                .create({
                    apartmentId: req.body.apartmentId,
                    area: req.body.area
                })
                .then((room) => {
                    return apartment
                        .update({
                            totalArea: apartment.getDataValue('totalArea') + room.getDataValue('area'),
                            roomsNumber: apartment.getDataValue('roomsNumber') + 1
                        })
                        .then(() => {
                            return res.status(201).send(room);
                        })
                        .catch((error) => {
                            return res.status(400).send(error);
                        });
                })
                .catch((error) => {
                    return res.status(400).send(error);
                });
        })
        .catch((error) => {
            return res.status(400).send(error);
        });
}

getRoomById = function (req, res) {
    return Room
        .findByPk(req.params.id, {
            include: [{
                model: Apartment,
                as: 'apartment'
            }, {
                model: Furniture,
                as: 'furniture',
            }]
        })
        .then((room) => {
            if (!room) {
                return res.status(404).send({
                    message: 'Room Not Found'
                });
            }

            return res.status(200).send(room);
        })
        .catch((error) => {
            return res.status(400).send(error);
        });
}

getRooms = function (req, res) {
    return Room
        .findAll({
            include: [{
                model: Apartment,
                as: 'apartment'
            }, {
                model: Furniture,
                as: 'furniture',
            }]
        })
        .then((rooms) => {
            return res.status(200).send(rooms);
        })
        .catch((error) => {
            return res.status(400).send(error);
        });
};

updateRoomById = function (req, res) {
    return Room
        .findByPk(req.params.id)
        .then((room) => {
            if (!room) {
                return res.status(404).send({
                    message: 'Room Not Found'
                });
            }

            return Apartment
                .findByPk(req.body.apartmentId)
                .then(apartment => {
                    if (!apartment) {
                        return res.status(400).send({
                            message: 'Apartment Not Found',
                        });
                    }

                    const oldApartmentId = room.getDataValue('apartmentId');
                    const oldArea = room.getDataValue('area');

                    return room
                        .update({
                            apartmentId: req.body.apartmentId,
                            area: req.body.area
                        })
                        .then(() => {
                            if (oldApartmentId !== req.body.apartmentId) {
                                return Apartment
                                    .findByPk(oldApartmentId)
                                    .then((oldApartment) => {
                                        const currentTotalArea = oldApartment.getDataValue('totalArea') - req.body.area;
                                        const currentRoomsNumber = oldApartment.getDataValue('roomsNumber') - 1;

                                        return oldApartment
                                            .update({
                                                totalArea: currentTotalArea < 0 ? 0 : currentTotalArea,
                                                roomsNumber: currentRoomsNumber < 0 ? 0 : currentRoomsNumber
                                            })
                                            .then(() => {
                                                return apartment
                                                    .update({
                                                        totalArea: apartment.getDataValue('totalArea') + req.body.area,
                                                        roomsNumber: apartment.getDataValue('roomsNumber') + 1
                                                    })
                                                    .then(() => {
                                                        return res.status(200).send(room);
                                                    })
                                                    .catch((error) => {
                                                        return res.status(400).send(error);
                                                    });
                                            })
                                            .catch((error) => {
                                                return res.status(400).send(error);
                                            });
                                    })
                                    .catch((error) => {
                                        return res.status(400).send(error);
                                    });
                            }

                            const currentTotalArea = apartment.getDataValue('totalArea') - oldArea + req.body.area;

                            return apartment
                                .update({
                                    totalArea: currentTotalArea < 0 ? 0 : currentTotalArea
                                })
                                .then(() => {
                                    return res.status(201).send(room);
                                })
                                .catch((error) => {
                                    return res.status(400).send(error);
                                });
                        })
                        .catch((error) => {
                            return res.status(400).send(error);
                        });
                })
                .catch((error) => {
                    return res.status(400).send(error);
                });
        })
        .catch((error) => {
            return res.status(400).send(error);
        });
}

deleteRoomById = function (req, res) {
    return Room
        .findByPk(req.params.id)
        .then(room => {
            if (!room) {
                return res.status(400).send({
                    message: 'Room Not Found',
                });
            }

            return Apartment
                .findByPk(room.getDataValue('apartmentId'))
                .then((apartment) => {
                    const currentTotalArea = apartment.getDataValue('totalArea') - room.getDataValue('area');
                    const currentRoomsNumber = apartment.getDataValue('roomsNumber') - 1;

                    return apartment
                        .update({
                            totalArea: currentTotalArea < 0 ? 0 : currentTotalArea,
                            roomsNumber: currentRoomsNumber < 0 ? 0 : currentRoomsNumber
                        })
                        .then(() => {
                            return room
                                .destroy()
                                .then(() => {
                                    return res.status(204).send();
                                })
                                .catch((error) => {
                                    return res.status(400).send(error);
                                });
                        })
                        .catch((error) => {
                            return res.status(400).send(error);
                        });
                })
                .catch((error) => {
                    return res.status(400).send(error);
                });
        })
        .catch((error) => {
            return res.status(400).send(error);
        });
}

module.exports = {
    getRooms,
    getRoomById,
    addRoom,
    updateRoomById,
    deleteRoomById
}
