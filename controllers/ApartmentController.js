const Apartment = require('../models/ApartmentModel')

let apartments = [
    new Apartment(1, 1, [1, 2, 3], "Затишна квартира на Троєщині", 8000,
        60, 4, "Cool apt", 402,
        5, "вул. Карпенка Карого 5", "Kiev"),
    new Apartment(2, 2, [1, 2, 3], "Квартира у центрі", 35000,
         80, 7, "Cool apt", 710,
        8, "вул. Хрещатик 1", "Kiev"),
    new Apartment(3, 1, [1, 2, 3], "Квартира на Осокорках", 15000,
        60, 10, "Cool apt", 1010,
        8, "вул. Єлтзавети Чавдар 8", "Kiev")
]

getApartments = function() {
    return apartments
};

addApartment = function (data){
    const apartment = new Apartment(
        data.id, data.user_id, data.rooms_list, data.heading, data.monthly_price, data.total_square, data.floor_number,
        data.description, data.number,  data.house_number, data.street_name, data.city_name
    )
    apartments[apartments.length] = apartment
    return apartment
}

getApartmentById = function (id){
    return apartments.find(apartment => apartment.id == id)
}
updateApartmentById = function (id, data) {
    const index = apartments.indexOf(getApartmentById(id))
    const apartment = new Apartment(
        data.id, data.user_id, data.rooms_list, data.heading, data.monthly_price, data.total_square, data.floor_number,
        data.description, data.number,  data.house_number, data.street_name, data.city_name
    )
    apartments[index] = apartment
    return apartment

}
deleteApartmentById = function(id) {
    const index = apartments.indexOf(getApartmentById(id))
    const apartment = getApartmentById(id)
    if (index > -1) {
        apartments.splice(index, 1);
    }
    return apartment
}
filterApartments = function (req, res, next){
    const filters = req.query;
    const filteredApartments = apartments.filter(apartment => {
        let isValid = true;
        for (key in filters) {
            console.log(key, apartment[key], filters[key]);
            isValid = isValid && apartment[key] == filters[key];
        }
        return isValid;
    });
    res.send(filteredApartments);
}
module.exports = {getApartments, addApartment, getApartmentById, updateApartmentById, deleteApartmentById, filterApartments}