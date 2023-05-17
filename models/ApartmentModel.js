class ApartmentModel {
    constructor(id, user_id, rooms_list, heading, monthly_price, publishing_date_time, total_square, floor_number, description, number, house_number, street_name, city_name) {
        this._id = id;
        this._user_id = user_id;
        this._rooms_list = rooms_list;
        this._heading = heading;
        this._monthly_price = monthly_price;
        this._publishing_date_time = publishing_date_time;
        this._total_square = total_square;
        this._floor_number = floor_number;
        this._description = description;
        this._number = number;
        this._house_number = house_number;
        this._street_name = street_name;
        this._city_name = city_name;
    }

    get id() {
        return this._id;
    }

    get user_id() {
        return this._user_id;
    }

    get rooms_list() {
        return this._rooms_list;
    }

    get heading() {
        return this._heading;
    }

    get monthly_price() {
        return this._monthly_price;
    }

    get publishing_date_time() {
        return this._publishing_date_time;
    }

    get total_square() {
        return this._total_square;
    }

    get floor_number() {
        return this._floor_number;
    }

    get description() {
        return this._description;
    }

    get number() {
        return this._number;
    }

    get house_number() {
        return this._house_number;
    }

    get street_name() {
        return this._street_name;
    }

    get city_name() {
        return this._city_name;
    }
}

module.exports = ApartmentModel