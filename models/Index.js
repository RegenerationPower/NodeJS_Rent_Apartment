const dbConfig = require('../config/dbConfig.js');

const {Sequelize, DataTypes} = require('sequelize');

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD, {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        operatorsAliases: 0,

        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle

        }
    }
);

sequelize
    .authenticate()
    .then(() => {
        console.log('Connected..')
    })
    .catch(err => {
        console.log('Error' + err)
    });

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.Apartment = require('./ApartmentModel')(sequelize, DataTypes);
db.Room = require('./RoomModel')(sequelize, DataTypes);
db.Furniture = require('./FurnitureModel')(sequelize, DataTypes);

db.Apartment.hasMany(db.Room, {
    foreignKey: 'id_apartment',
    as: 'rooms'
});

db.Room.belongsTo(db.Apartment, {
    foreignKey: 'id_apartment',
    as: 'apartment'
});

db.Room.belongsToMany(db.Furniture, {
    through: 'rooms_furniture',
    foreignKey: 'id_room',
    as: 'furniture'
});

db.Furniture.belongsToMany(db.Room, {
    through: 'rooms_furniture',
    foreignKey: 'id_furniture',
    as: 'rooms'
});

db.sequelize
    .sync({force: false})
    .then((result) => {
        console.log(result);
    })
    .catch((error) => {
        console.log(error);
    });

module.exports = db;
