const express = require('express');
const {addApartment, getApartmentById, updateApartmentById, deleteApartmentById, filterApartments} = require("../controllers/ApartmentController");
const schemas = require("../helpers/validaton_schema")

const apartmentRouter = express.Router();

apartmentRouter.route('/')
    .get(filterApartments)
    .post((req, res) => {
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
    .get((req, res) => {
        const apartment = getApartmentById(req.params.apartmentId)
        if (apartment) {
            const acceptHeader = req.headers.accept;
            if (acceptHeader && acceptHeader.includes('application/json')) {
                res.statusCode = 200
                res.json(apartment);
            } else {
                res.render('apartment', {apartment});
            }
        }
        else{
            res.statusCode = 404
            res.end('No apartment found')
        }
    })
    .put((req, res) => {
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
    .delete((req, res) => {
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
