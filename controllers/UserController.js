const User = require('../models/UserModel');

let users = [
    new User(1, 1, 'Bobby', 'Fish', 'bob.fish@gmail.com', '12345'),
    new User(2, 1, 'First', 'Last', 'first1@gmail.com', '12345'),
];

getUsers = function() {
    const userInfo = users[0].getInfo();
    console.log(userInfo);
    return users
};

addUser = function (data){
    const user = new User(data.id, data.id_role, data.first_name, data.last_name, data.email, data.password)
    users[users.length] = user
    return user
}

getUserById = function (id){
    return users.find(user => user.id == id)
}
updateUserById = function (id, data) {
    const index = users.indexOf(getUserById(id))
    const user = new User(data.id, data.id_role, data.first_name, data.last_name, data.email, data.password)
    users[index] = user
    return user

}
deleteUserById = function(id) {
    const index = users.indexOf(getUserById(id))
    const user = getUserById(id)
    if (index > -1) {
        users.splice(index, 1);
    }
    return user
}
module.exports = {addUser, getUsers, getUserById, updateUserById ,deleteUserById, users}