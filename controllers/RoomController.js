const Room = require('../models/RoomModel')

let rooms = [
    new Room(1, 'Living Room', 22),
    new Room(2, 'Kitchen', 15),
    new Room(3, 'Bathroom', 10)
]

getRooms = function() {
    return rooms
};

addRoom = function (data){
    const room = new Room(data.id, data.type, data.square)
    rooms[rooms.length] = room
    return room
}

getRoomById = function (id){
    return rooms.find(room => room.id == id)
}
updateRoomById = function (id, data) {
    const index = rooms.indexOf(getRoomById(id))
    const room = new Room(data.id, data.type, data.square)
    rooms[index] = room
    return room

}
deleteRoomById = function(id) {
    const index = rooms.indexOf(getRoomById(id))
    const room = getRoomById(id)
    if (index > -1) {
        rooms.splice(index, 1);
    }
    return room
}
filterRooms = function (req, res, next){
    const filters = req.query;
    const filteredRooms = rooms.filter(room => {
        let isValid = true;
        for (key in filters) {
            console.log(key, room[key], filters[key]);
            isValid = isValid && room[key] == filters[key];
        }
        return isValid;
    });
    res.send(filteredRooms);
}
module.exports = {getRooms, getRoomById, addRoom, updateRoomById, deleteRoomById, filterRooms}