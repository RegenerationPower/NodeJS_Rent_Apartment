class UserModel {
    constructor(id, id_role, first_name, last_name, email, password) {
        this._id = id;
        this._id_role = id_role;
        this._first_name = first_name;
        this._last_name = last_name;
        this._email = email;
        this._password = password;
    }

    getInfo() {
        return `User ${this._first_name} ${this._last_name} with ID ${this._id} with RoleID ${this._id_role} email ${this._email} and password ${this._password}`;
    }

    get id() {
        return this._id;
    }

    get id_role() {
        return this._role;
    }

    get first_name() {
        return this._first_name;
    }

    get last_name() {
        return this._last_name;
    }

    get email() {
        return this._email;
    }

    get password() {
        return this._password;
    }
}

module.exports = UserModel;