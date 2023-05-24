const express = require('express');
const bodyParser = require('body-parser');
const roomController = require('../controllers/RoomController');
const {getApartments, addApartment, getApartmentById, updateApartmentById, deleteApartmentById, filterApartments} = require("../controllers/ApartmentController");
const schemas = require("../helpers/validaton_schema")

const apartmentRouter = express.Router();

apartmentRouter.route('/')
    .get(filterApartments)
    .post((req, res, next) => {
        const result_data = schemas.apartmentSchema.validate(req.body)
        if (result_data.error){
            res.statusCode = 400
            res.send(result_data.error)
        }else{
            res.statusCode = 201;
            res.setHeader('Content-Type', 'application/json')
            addApartment(req.body)
            res.send("Created")
        }
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
        const result_data = schemas.apartmentSchema.validate(req.body)
        if (result_data.error){
            res.statusCode = 400
            res.send(result_data.error)
        }else{
            res.setHeader('Content-Type', 'application/json')
            res.statusCode = 200
            res.json(updateApartmentById(req.params.apartmentId, req.body))
        }
    })
    .delete((req, res, next) => {
        if (!getApartmentById(req.params.apartmentId)){
            res.statusCode = 403
            res.send("No apartment found")
        }else{
            res.setHeader('Content-Type', 'application/json')
            res.statusCode = 200
            res.json(deleteApartmentById(req.params.apartmentId))
        }
    })


module.exports = apartmentRouter;
