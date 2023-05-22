const express = require('express');
const bodyParser = require('body-parser')
const router = express.Router();
const {getUserById, getUsers, updateUserById, deleteUserById, addUser, filterUsers} = require("../controllers/UserController");

router.route('/')
    .get(filterUsers)
    // .get((req, res, next) => {
    //     res.statusCode = 200;
    //     res.setHeader('Content-Type', 'application/json')
    //     res.json(getUsers())
    // })
    .post((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json')
        res.json(addUser(req.body))
    })

router.route('/:userId')
    .get((req, res, next) => {
        const user = getUserById(req.params.userId)
        if (user) {
            res.setHeader('Content-Type', 'application/json')
            res.json(user)
        }else{
            res.statusCode = 404
            res.end('No user found')
        }
    })
    .put((req, res, next) => {
        res.setHeader('Content-Type', 'application/json')
        res.json(updateUserById(req.params.userId, req.body))
    })
    .delete((req, res, next) => {
        res.setHeader('Content-Type', 'application/json')
        res.json(deleteUserById(req.params.userId))
    })


module.exports = router;
