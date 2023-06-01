module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Furniture', {
            name: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false
            },
        },
        {
            tableName: 'furniture'
        }
    );
}
