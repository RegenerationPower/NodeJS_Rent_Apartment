const express = require('express');
const swaggerUi = require('swagger-ui-express');

const swaggerDocument = require('./swagger.json');

const apartmentRouter = require('./routers/apartment.router');
const roomRouter = require('./routers/room.router');
const furnitureRouter = require('./routers/furniture.router');
const roomFurnitureRouter = require('./routers/room.furniture.router');

const redisRoomRouter = require('./routers/redis.room.router');
const redisFurnitureRouter = require('./routers/redis.furniture.router');
const redisApartmentRouter = require('./routers/redis.apartment.router');

const PORT = 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/rooms', roomRouter);
app.use('/furniture', furnitureRouter);
app.use('/apartments', apartmentRouter);
app.use('/rooms-furniture', roomFurnitureRouter);

app.use('/redis-rooms', redisRoomRouter);
app.use('/redis-furniture', redisFurnitureRouter);
app.use('/redis-apartments', redisApartmentRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});
