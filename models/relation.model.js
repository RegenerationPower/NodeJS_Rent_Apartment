const sequelize = require('../config/db');
const Room = require('../models/room.model');
const Furniture = require('../models/furniture.model');
const Apartment = require('../models/apartment.model');
const RoomFurniture = require('../models/room.furniture.model');

const db = {};

sequelize
    .authenticate()
    .then(() => {
        console.log('Connected..')
    })
    .catch(err => {
        console.log('Error' + err)
    });

Apartment.hasMany(Room, {
    foreignKey: {
        field: 'id_apartment',
        name: 'apartmentId',
        allowNull: false
    },
    onDelete: 'CASCADE',
    as: 'rooms'
});

Room.belongsTo(Apartment, {
    foreignKey: {
        field: 'id_apartment',
        name: 'apartmentId',
        allowNull: false
    },
    as: 'apartment'
});

Room.belongsToMany(Furniture, {
    through: RoomFurniture,
    foreignKey: 'roomId',
    as: 'furniture'
});

Furniture.belongsToMany(Room, {
    through: RoomFurniture,
    foreignKey: 'furnitureId',
    as: 'rooms'
});

sequelize
    .sync({
        force: false
    })
    .then((result) => {
        console.log(result);
    })
    .catch((error) => {
        console.log(error);
    });

db.Room = Room;
db.Furniture = Furniture;
db.Apartment = Apartment;
db.RoomFurniture = RoomFurniture;

db.sequelize = sequelize;

module.exports = db;
