const db = require('../models/relation.model');

const Room = db.Room;
const Furniture = db.Furniture;
const RoomFurniture = db.RoomFurniture

addRoomFurniture = function (req, res) {
    return Room
        .findByPk(req.body.roomId)
        .then(room => {
            if (!room) {
                return res.status(400).send({
                    message: 'Room Not Found',
                });
            }

            return Furniture
                .findByPk(req.body.furnitureId)
                .then((furniture) => {
                    if (!furniture) {
                        return res.status(404).send({
                            message: 'Furniture Not Found'
                        });
                    }

                    return RoomFurniture
                        .create({
                            roomId: req.body.roomId,
                            furnitureId: req.body.furnitureId
                        })
                        .then((roomFurniture) => {
                            return res.status(201).send(roomFurniture)
                        })
                        .catch((error) => {
                            return res.status(400).send(error)
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

getRoomFurnitureById = function (req, res) {
    return RoomFurniture
        .findByPk(req.params.id)
        .then((roomFurniture) => {
            if (!roomFurniture) {
                return res.status(404).send({
                    message: 'RoomFurniture Not Found'
                });
            }

            return res.status(200).send(roomFurniture);
        })
        .catch((error) => {
            return res.status(400).send(error);
        });
}

getRoomFurniture = function (req, res) {
    return RoomFurniture
        .findAll()
        .then((roomFurnitureList) => {
            return res.status(200).send(roomFurnitureList);
        })
        .catch((error) => {
            return res.status(400).send(error);
        });
};

updateRoomFurnitureById = function (req, res) {
    return RoomFurniture
        .findByPk(req.params.id)
        .then((roomFurniture) => {
            if (!roomFurniture) {
                return res.status(404).send({
                    message: 'RoomFurniture Not Found'
                });
            }

            return Room
                .findByPk(req.body.roomId)
                .then(room => {
                    if (!room) {
                        return res.status(400).send({
                            message: 'Room Not Found',
                        });
                    }

                    return Furniture
                        .findByPk(req.body.furnitureId)
                        .then((furniture) => {
                            if (!furniture) {
                                return res.status(404).send({
                                    message: 'Furniture Not Found'
                                });
                            }

                            return roomFurniture
                                .update({
                                    roomId: req.body.roomId,
                                    furnitureId: req.body.furnitureId
                                })
                                .then((roomFurniture) => {
                                    return res.status(201).send(roomFurniture)
                                })
                                .catch((error) => {
                                    return res.status(400).send(error)
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
            return res.status(400).send(error)
        });
}

deleteRoomFurnitureById = function (req, res) {
    return RoomFurniture
        .findByPk(req.params.id)
        .then(roomFurniture => {
            if (!roomFurniture) {
                return res.status(400).send({
                    message: 'RoomFurniture Not Found',
                });
            }

            return roomFurniture
                .destroy()
                .then(() => {
                    return res.status(204).send()
                })
                .catch((error) => {
                    return res.status(400).send(error)
                });
        })
        .catch((error) => {
            return res.status(400).send(error)
        });
}

filterRoomFurniture = function (req, res) {
}

module.exports = {
    getRoomFurniture,
    getRoomFurnitureById,
    addRoomFurniture,
    updateRoomFurnitureById,
    deleteRoomFurnitureById,
    filterRoomFurniture
}
