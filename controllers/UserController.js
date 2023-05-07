const User = require('../models/UserModel');

exports.getUsers = function(req, res) {
    const users = [
        new User(1, 1, 'Bobby', 'Fish', 'bob.fish@gmail.com', '12345'),
        new User(2, 1, 'First', 'Last', 'first1@gmail.com', '12345'),
    ];

    const userInfo = users[0].getInfo();
    console.log(userInfo);
    res.json(users);
};