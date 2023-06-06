const DataTypes = require('sequelize');

const sequelize = require('../config/db');

const Apartment = sequelize.define('Apartment', {
        monthlyPrice: {
            field: 'monthly_price',
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 0
            }
        },
        publishingDateTime: {
            field: 'publishing_date_time',
            type: DataTypes.DATE,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
        },
        viewsNumber: {
            field: 'views_number',
            type: DataTypes.INTEGER,
            defaultValue: 0,
            validate: {
                min: 0
            }
        },
        totalArea: {
            field: 'total_area',
            type: DataTypes.INTEGER,
            defaultValue: 0,
            validate: {
                min: 0
            }
        },
        floorNumber: {
            field: 'floor_number',
            type: DataTypes.INTEGER,
            allowNull: false
        },
        roomsNumber: {
            field: 'rooms_number',
            type: DataTypes.INTEGER,
            defaultValue: 0,
            validate: {
                min: 0
            }
        },
        hasCentralizedHeating: {
            field: 'has_centralized_heating',
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        description: {
            type: DataTypes.TEXT
        },
        houseNumber: {
            field: 'house_number',
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 0
            }
        },
        streetName: {
            field: 'street_name',
            type: DataTypes.STRING,
            allowNull: false
        },
        cityName: {
            field: 'city_name',
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'apartments',
        timestamps: false
    }
);

module.exports = Apartment;
