class RoomModel {
    constructor(id, type, square) {
        this._id = id;
        this._type = type;
        this._square = square;
    }

    get id() {
        return this._id;
    }

    get type() {
        return this._type;
    }

    get square() {
        return this._square;
    }
}

module.exports = RoomModel