const DataTypes = require('sequelize');

const sequelize = require('../config/db');

const Furniture = sequelize.define('Furniture', {
        name: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
    }, {
        tableName: 'furniture',
        timestamps: false
    }
);

module.exports = Furniture;
