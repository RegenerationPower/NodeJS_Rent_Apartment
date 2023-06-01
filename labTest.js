const assert = require('assert');
const { getApartments, getApartmentById, updateApartmentById, deleteApartmentById, filterApartments} = require('./controllers/ApartmentController');
const { getRooms, getRoomById, updateRoomById, deleteRoomById, filterRooms } = require('./controllers/RoomController');
const { describe, it } = require('mocha');

describe('getApartments', function () {
    it('should return an array of apartments', function () {
        const apartments = getApartments();
        assert(Array.isArray(apartments), 'apartments should be an array');
    });
});

describe('getApartmentById', function () {
    it('should return the correct apartment by ID', function () {
        const apartmentId = 1;
        const apartment = getApartmentById(apartmentId);
        assert.strictEqual(apartment.id, apartmentId, 'returned apartment should have the specified ID');
    });
});

describe('updateApartmentById', function () {
    it('should update the specified apartment', function () {
        const apartmentId = 1;
        const updatedApartmentData = {
            id: apartmentId,
            heading: 'Updated Apartment Heading',
        };
        const updatedApartment = updateApartmentById(apartmentId, updatedApartmentData);
        assert.strictEqual(updatedApartment.id, apartmentId, 'updated apartment should have the same ID');
        assert.strictEqual(updatedApartment.heading, updatedApartmentData.heading, 'apartment heading should be updated');
    });
});


describe('deleteApartmentById', function () {
    it('should delete the specified apartment', function () {
        const apartmentId = 1;
        const deletedApartment = deleteApartmentById(apartmentId);
        assert.strictEqual(deletedApartment.id, apartmentId, 'deleted apartment should have the specified ID');
        const apartments = getApartments();
        const foundApartment = apartments.find(apartment => apartment.id === apartmentId);
        assert.strictEqual(foundApartment, undefined, 'deleted apartment should not be found in the list');
    });
});

describe('filterApartments', function () {
    it('should return filtered apartments based on provided filters', function () {
        const req = {
            query: {
                city_name: 'Kyiv',
                total_square: 60
            }
        };

        const res = {
            send: function (filteredApartments) {
                assert(Array.isArray(filteredApartments), 'filtered apartments should be an array');
                assert.strictEqual(filteredApartments.length, 1, 'should return 1 filtered apartment');
                assert.strictEqual(filteredApartments[0].city_name, req.query.city_name, 'filtered apartment should have the specified city_name');
                assert.strictEqual(filteredApartments[0].total_square, parseInt(req.query.total_square), 'filtered apartment should have the specified total_square');
            }
        };

        filterApartments(req, res);
    });
});

describe('getRooms', function () {
    it('should return an array of rooms', function () {
        const rooms = getRooms();
        assert(Array.isArray(rooms), 'rooms should be an array');
    });
});

describe('getRoomById', function () {
    it('should return the correct room by ID', function () {
        const roomId = 1;
        const room = getRoomById(roomId);
        assert.strictEqual(room.id, roomId, 'returned room should have the specified ID');
    });
});

describe('updateRoomById', function () {
    it('should update the specified room', function () {
        const roomId = 1;
        const updatedRoomData = {
            id: roomId,
            type: 'Updated Room Type',
            square: 30,
        };
        const updatedRoom = updateRoomById(roomId, updatedRoomData);
        assert.strictEqual(updatedRoom.id, roomId, 'updated room should have the same ID');
        assert.strictEqual(updatedRoom.type, updatedRoomData.type, 'room type should be updated');
        assert.strictEqual(updatedRoom.square, updatedRoomData.square, 'room square should be updated');
    });
});

describe('deleteRoomById', function () {
    it('should delete the specified room', function () {
        const roomId = 1;
        const deletedRoom = deleteRoomById(roomId);
        assert.strictEqual(deletedRoom.id, roomId, 'deleted room should have the specified ID');
        const rooms = getRooms();
        const foundRoom = rooms.find(room => room.id === roomId);
        assert.strictEqual(foundRoom, undefined, 'deleted room should not be found in the list');
    });
});

describe('filterRooms', function () {
    it('should filter rooms based on the specified filters', function () {
        const req = {
            query: {
                type: 'Bathroom',
                size: 2
            }
        };
        const res = {
            send: function (filteredRooms) {
                assert(Array.isArray(filteredRooms), 'filteredRooms should be an array');
                assert.strictEqual(filteredRooms.length, 2, 'filteredRooms should contain 2 rooms');
                assert.strictEqual(filteredRooms[0].type, 'Bathroom', 'first room should have the specified type');
                assert.strictEqual(filteredRooms[1].type, 'Bathroom', 'second room should have the specified type');
                assert.strictEqual(filteredRooms[0].square, 10, 'first room should have the specified square');
                assert.strictEqual(filteredRooms[1].square, 17, 'second room should have the specified square');
            }
        };

        filterRooms(req, res);
    });

    it('should filter rooms case-insensitively', function () {
        const req = {
            query: {
                type: 'bathroom',
                size: 2
            }
        };
        const res = {
            send: function (filteredRooms) {
                assert(Array.isArray(filteredRooms), 'filteredRooms should be an array');
                assert.strictEqual(filteredRooms.length, 2, 'filteredRooms should contain 2 rooms');
                assert.strictEqual(filteredRooms[0].type, 'Bathroom', 'first room should have the specified type');
                assert.strictEqual(filteredRooms[1].type, 'Bathroom', 'second room should have the specified type');
                assert.strictEqual(filteredRooms[0].square, 10, 'first room should have the specified square');
                assert.strictEqual(filteredRooms[1].square, 17, 'second room should have the specified square');
            }
        };

        filterRooms(req, res);
    });

    it('should paginate the filtered rooms', function () {
        const req = {
            query: {
                type: 'Bathroom',
                size: 1,
                page: 2
            }
        };
        const res = {
            send: function (filteredRooms) {
                assert(Array.isArray(filteredRooms), 'filteredRooms should be an array');
                assert.strictEqual(filteredRooms.length, 1, 'filteredRooms should contain 1 room');
                assert.strictEqual(filteredRooms[0].type, 'Bathroom', 'room should have the specified type');
                assert.strictEqual(filteredRooms[0].square, 17, 'room should have the specified square');
            }
        };

        filterRooms(req, res);
    });
});