const db = require('../models/relation.model');

const Furniture = db.Furniture
const Room = db.Room;

addFurniture = function (req, res) {
    return Furniture
        .create({
            name: req.body.name
        })
        .then((furniture) => {
            return res.status(201).send(furniture)
        })
        .catch((error) => {
            return res.status(400).send(error)
        });
}

getFurnitureById = function (req, res) {
    return Furniture
        .findByPk(req.params.id, {
            include: [{
                model: Room,
                as: 'rooms',
            }]
        })
        .then((furniture) => {
            if (!furniture) {
                return res.status(404).send({
                    message: 'Furniture Not Found'
                });
            }

            return res.status(200).send(furniture);
        })
        .catch((error) => {
            return res.status(400).send(error);
        });
}

getFurniture = function (req, res) {
    return Furniture
        .findAll({
            include: [{
                model: Room,
                as: 'rooms',
            }]
        })
        .then((furniture) => {
            return res.status(200).send(furniture);
        })
        .catch((error) => {
            return res.status(400).send(error);
        });
};

updateFurnitureById = function (req, res) {
    return Furniture
        .findByPk(req.params.id, {
            include: [{
                model: Room,
                as: 'rooms',
            }]
        })
        .then((furniture) => {
            if (!furniture) {
                return res.status(404).send({
                    message: 'Furniture Not Found'
                });
            }

            return furniture
                .update({
                    name: req.body.name
                })
                .then(() => {
                    return res.status(200).send(furniture)
                })
                .catch((error) => {
                    return res.status(400).send(error)
                });
        })
        .catch((error) => {
            return res.status(400).send(error)
        });
}

deleteFurnitureById = function (req, res) {
    return Furniture
        .findByPk(req.params.id)
        .then(furniture => {
            if (!furniture) {
                return res.status(400).send({
                    message: 'Furniture Not Found',
                });
            }

            return furniture
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

module.exports = {
    getFurniture,
    getFurnitureById,
    addFurniture,
    updateFurnitureById,
    deleteFurnitureById
}
