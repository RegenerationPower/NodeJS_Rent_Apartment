const DataTypes = require('sequelize');

const sequelize = require('../config/db');

const Room = sequelize.define('Room', {
        area: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 0
            }
        }
    }, {
        tableName: 'rooms',
        timestamps: false
    }
);

module.exports = Room;
