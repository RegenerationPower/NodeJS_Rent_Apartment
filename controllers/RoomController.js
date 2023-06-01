const db = require('../models/Index')

const Apartment = db.Apartment;
const Room = db.Room;
const Furniture = db.Furniture;

addRoom = function (req, res) {
    return Apartment
        .findByPk(req.body.id_apartment)
        .then(apartment => {
            if (!apartment) {
                return res.status(400).send({
                    message: 'Apartment Not Found',
                });
            }

            return Room
                .create({
                    id_apartment: req.body.id_apartment,
                    area: req.body.area
                })
                .then((room) => {
                    apartment
                        .update({
                            totalArea: apartment.getDataValue('totalArea') + room.getDataValue('area'),
                            roomsNumber: apartment.getDataValue('roomsNumber') + 1
                        })
                        .then(() => {
                            res.status(201).send(room)
                        })
                        .catch((error) => {
                            res.status(400).send(error)
                        });
                })
                .catch((error) => {
                    res.status(400).send(error)
                });
        })
        .catch((error) => {
            res.status(400).send(error)
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
            res.status(400).send(error);
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
            res.status(200).send(rooms);
        })
        .catch((error) => {
            res.status(400).send(error);
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

            return room
                .update({
                    id_apartment: req.body.id_apartment,
                    area: req.body.area
                })
                .then(() => {
                    res.status(200).send(room)
                })
                .catch((error) => {
                    res.status(400).send(error)
                });
        })
        .catch((error) => {
            res.status(400).send(error)
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

            return room
                .destroy()
                .then(() => {
                    res.status(204).send()
                })
                .catch((error) => {
                    res.status(400).send(error)
                });
        })
        .catch((error) => {
            res.status(400).send(error)
        });
}

filterRooms = function (req, res) {
}

module.exports = {
    getRooms,
    getRoomById,
    addRoom,
    updateRoomById,
    deleteRoomById,
    filterRooms
}
