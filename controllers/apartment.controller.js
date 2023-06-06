const db = require('../models/relation.model');

const Apartment = db.Apartment
const Room = db.Room;
const Furniture = db.Furniture;

const addApartment = function (req, res) {
    return Apartment
        .create({
            monthlyPrice: req.body.monthlyPrice,
            viewsNumber: req.body.viewsNumber,
            floorNumber: req.body.floorNumber,
            hasCentralizedHeating: req.body.hasCentralizedHeating,
            description: req.body.description,
            houseNumber: req.body.houseNumber,
            streetName: req.body.streetName,
            cityName: req.body.cityName
        })
        .then((apartment) => {
            return res.status(201).send(apartment);
        })
        .catch((error) => {
            return res.status(400).send(error);
        });
}

const getApartments = function (req, res) {
    return Apartment
        .findAll({
            include: [{
                model: Room,
                as: 'rooms',
                include: [{
                    model: Furniture,
                    as: 'furniture'
                }]
            }]
        })
        .then((apartments) => {
            return res.status(200).send(apartments);
        })
        .catch((error) => {
            return res.status(400).send(error);
        });
}

const getApartmentById = function (req, res) {
    return Apartment
        .findByPk(req.params.id, {
            include: [{
                model: Room,
                as: 'rooms',
                include: [{
                    model: Furniture,
                    as: 'furniture'
                }]
            }]
        })
        .then((apartment) => {
            if (!apartment) {
                return res.status(404).send({
                    message: 'Apartment Not Found'
                });
            }

            return res.status(200).send(apartment);
        })
        .catch((error) => {
            return res.status(400).send(error);
        });
}

const updateApartmentById = function (req, res) {
    return Apartment
        .findByPk(req.params.id)
        .then((apartment) => {
            if (!apartment) {
                return res.status(404).send({
                    message: 'Apartment Not Found'
                });
            }

            return apartment
                .update({
                    monthlyPrice: req.body.monthlyPrice,
                    viewsNumber: req.body.viewsNumber,
                    floorNumber: req.body.floorNumber,
                    hasCentralizedHeating: req.body.hasCentralizedHeating,
                    description: req.body.description,
                    houseNumber: req.body.houseNumber,
                    streetName: req.body.streetName,
                    cityName: req.body.cityName
                })
                .then((apartments) => {
                    return res.status(200).send(apartments);
                })
                .catch((error) => {
                    return res.status(400).send(error);
                });
        })
        .catch((error) => {
            return res.status(400).send(error);
        });
}

const deleteApartmentById = function (req, res) {
    return Apartment
        .findByPk(req.params.id)
        .then(apartment => {
            if (!apartment) {
                return res.status(400).send({
                    message: 'Apartment Not Found',
                });
            }

            return apartment
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
}

module.exports = {
    addApartment,
    getApartments,
    getApartmentById,
    updateApartmentById,
    deleteApartmentById
};
