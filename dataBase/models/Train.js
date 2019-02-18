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
            connection: {
                type: DataTypes.STRING
            },
            type: {
                type: DataTypes.STRING
            },
            count_of_cars: {
                type: DataTypes.INTEGER
            },
            time_of_arrive: {
                type: DataTypes.TIME
            },
            time_of_depart: {
                type: DataTypes.TIME
            },
            station_id: {
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
