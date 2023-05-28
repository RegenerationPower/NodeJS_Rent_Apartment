const express = require('express');
const router = express.Router();
const {getUserById, updateUserById, deleteUserById, addUser, filterUsers} = require("../controllers/UserController");
const schemas = require("../helpers/validaton_schema")
router.route('/')
    .get(filterUsers)
    .post((req, res) => {
        const result_data = schemas.userSchema.validate(req.body)
        if (result_data.error){
            res.statusCode = 400
            res.send(result_data.error)
        }else{
            res.statusCode = 201;
            res.setHeader('Content-Type', 'application/json')
            addUser(result_data.value)
            res.send("Created")
        }
    })

router.route('/:userId')
    .get((req, res) => {
        const user = getUserById(req.params.userId)
        if (user) {
            const acceptHeader = req.headers.accept;
            if (acceptHeader && acceptHeader.includes('application/json')) {
                res.statusCode = 200
                res.json(user);
            } else {
                res.render('user', {user});
            }
        }else{
            res.statusCode = 404
            res.end('No user found')
        }
    })
    .put((req, res) => {
        const result_data = schemas.userSchema.validate(req.body)
        if (result_data.error){
            res.statusCode = 400
            res.send(result_data.error)
        }else {
            res.setHeader('Content-Type', 'application/json')
            res.statusCode = 200
            res.json(updateUserById(req.params.userId, result_data.value))
        }
    })
    .delete((req, res) => {
        if (!getUserById(req.params.userId)){
            res.statusCode = 403
            res.send("No user found")
        }else{
            res.setHeader('Content-Type', 'application/json')
            res.statusCode = 200
            res.json(deleteUserById(req.params.userId))
        }
    })


module.exports = router;
