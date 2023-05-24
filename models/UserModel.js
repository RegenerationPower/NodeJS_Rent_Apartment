class UserModel {
    constructor(id, role, first_name, last_name, email, password) {
        this._id = id;
        this._role = role;
        this._first_name = first_name;
        this._last_name = last_name;
        this._email = email;
        this._password = password;
    }

    getInfo() {
        return `User ${this._first_name} ${this._last_name} with ID ${this._id} with RoleID ${this._role} email ${this._email} and password ${this._password}`;
    }

    get id() {
        return this._id;
    }

    get role() {
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