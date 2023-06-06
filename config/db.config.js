module.exports = {
    HOST: 'localhost',
    USER: 'postgres',
    PASSWORD: 'yatsergray',
    DB: 'rent_apartment_service_db',
    dialect: 'postgres',

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}

