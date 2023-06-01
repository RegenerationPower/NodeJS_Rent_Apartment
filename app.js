const express = require('express');

const apartmentRouter = require('./routes/ApartmentRouter');
const roomRouter = require('./routes/RoomRouter');
const furnitureRouter = require('./routes/FurnitureRouter');

const PORT = 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/apartments', apartmentRouter);
app.use('/rooms', roomRouter);
app.use('/furniture', furnitureRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});
