const express = require('express');

const apartmentController = require("../controllers/apartment.controller");

const apartmentRouter = express.Router();

apartmentRouter.route('/')
    .get(apartmentController.getApartments)
    .post(apartmentController.addApartment);

apartmentRouter.route('/:id')
    .get(apartmentController.getApartmentById)
    .put(apartmentController.updateApartmentById)
    .delete(apartmentController.deleteApartmentById)

module.exports = apartmentRouter;
