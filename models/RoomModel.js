module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Room', {
            area: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        },
        {
            tableName: 'rooms'
        }
    );
}
