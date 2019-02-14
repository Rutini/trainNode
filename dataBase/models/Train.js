'use strict';
module.exports = (sequelize, DataTypes) => {
    const Train = sequelize.define('Train', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            number: {
                type: DataTypes.INTEGER
            },
            type: {
                type: DataTypes.STRING
            },
            count_of_cars: {
                type: DataTypes.INTEGER
            }
        },
        {
            tableName: 'trains',
            timestamps: false
        }
    );
    return Train;
};
