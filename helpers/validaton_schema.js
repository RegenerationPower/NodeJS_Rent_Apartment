const Joi = require('joi')

const userSchema = Joi.object({
    id: Joi.number().min(0).required(),
    role: Joi.string().required(),
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(2).required()
})
const roomSchema = Joi.object({
    id: Joi.number().min(0).required(),
    type: Joi.string().required(),
    square: Joi.number().min(0).required()
})
const apartmentSchema = Joi.object({
    id: Joi.number().min(0).required(),
    user_id: Joi.number().min(0).required(),
    rooms_list: Joi.array().required(),
    heading: Joi.string().required(),
    monthly_price: Joi.number().min(0).required(),
    total_square: Joi.number().min(0).required(),
    floor_number: Joi.number().min(0).required(),
    description: Joi.string().required(),
    number: Joi.number().min(0).required(),
    house_number: Joi.number().min(0).required(),
    street_name: Joi.string().required(),
    city_name: Joi.string().required()
})
module.exports = {userSchema, roomSchema, apartmentSchema}