const express = require('express');
const apartmentController = require("../controllers/ApartmentController");

const apartmentRouter = express.Router();

apartmentRouter.route('/')
    .get(apartmentController.getApartments)
    .get(apartmentController.filterApartments)
    .post(apartmentController.addApartment);

apartmentRouter.route('/:id')
    .get(apartmentController.getApartmentById)
    .put(apartmentController.updateApartmentById)
    .delete(apartmentController.deleteApartmentById)

module.exports = apartmentRouter;
