class UserModel {
    constructor(id, id_role, first_name, last_name, email, password) {
        this.id = id;
        this.id_role = id_role;
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.password = password;
    }

    getInfo() {
        return `User ${this.first_name} ${this.last_name} with ID ${this.id} with RoleID ${this.id_role} email ${this.email} and password ${this.password}`;
    }
}

module.exports = UserModel;