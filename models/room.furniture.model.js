const DataTypes = require('sequelize');

const sequelize = require('../config/db');
const Room = require('../models/room.model');
const Furniture = require('../models/furniture.model');

const RoomFurniture = sequelize.define('RoomFurniture', {
        roomId: {
            field: 'id_room',
            type: DataTypes.INTEGER,
            references: {
                model: Room,
                key: 'id'
            }
        },
        furnitureId: {
            field: 'id_furniture',
            type: DataTypes.INTEGER,
            references: {
                model: Furniture,
                key: 'id'
            }
        }
    }, {
        tableName: 'rooms_furniture',
        timestamps: false
    }
);

module.exports = RoomFurniture;

