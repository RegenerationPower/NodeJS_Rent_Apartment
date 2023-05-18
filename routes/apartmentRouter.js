const express = require('express');
const bodyParser = require('body-parser');
const roomController = require('../controllers/RoomController');
const {getApartments, addApartment, getApartmentById, updateApartmentById, deleteApartmentById} = require("../controllers/ApartmentController");

const apartmentRouter = express.Router();

apartmentRouter.route('/')
    .get((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json')
        res.json(getApartments())
    })
    .post((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json')
        res.json(addApartment(req.body))
    })

apartmentRouter.route('/:apartmentId')
    .get((req, res, next) => {
        const room = getApartmentById(req.params.apartmentId)
        if (room) {
            res.setHeader('Content-Type', 'application/json')
            res.json(room)
        }else{
            res.statusCode = 404
            res.end('No apartment found')
        }
    })
    .put((req, res, next) => {
        res.setHeader('Content-Type', 'application/json')
        res.json(updateApartmentById(req.params.apartmentId, req.body))
    })
    .delete((req, res, next) => {
        res.setHeader('Content-Type', 'application/json')
        res.json(deleteApartmentById(req.params.apartmentId))
    })


module.exports = apartmentRouter;
