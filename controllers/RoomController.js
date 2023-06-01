const Room = require('../models/RoomModel')

let rooms = [
    new Room(1, 'Living Room', 22),
    new Room(2, 'Kitchen', 15),
    new Room(3, 'Bathroom', 10),
    new Room(4, 'Bathroom', 17)
]

getRooms = function() {
    return rooms
};

addRoom = function (data){
    const room = new Room(data.id, data.type, data.square)
    rooms[rooms.length] = room
    return room
}

getRoomById = function (id) {
    const roomId = parseInt(id, 10);
    return rooms.find(room => room.id === roomId);
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

filterRooms = function (req, res) {
    const filters = req.query;
    let filteredRooms = rooms.filter(room => {
        let isValid = true;
        for (let key in filters) {
            if (key === 'page' || key === 'size') continue;
            if (typeof room[key] === 'string') {
                isValid = isValid && room[key].toLowerCase().includes(filters[key].toLowerCase());
            } else {
                isValid = isValid && room[key] == filters[key];
            }
        }
        return isValid;
    });

    let page = parseInt(req.query.page);
    let size = parseInt(req.query.size);
    if (page && size) {
        filteredRooms = filteredRooms.slice((page - 1) * size, page * size);
    }

    res.send(filteredRooms);
}

module.exports = {getRooms, getRoomById, addRoom, updateRoomById, deleteRoomById, filterRooms}