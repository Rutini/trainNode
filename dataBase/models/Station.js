'use strict';

module.exports = (sequelize, DataTypes) => {
    const Station = sequelize.define('Station', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: DataTypes.STRING
            }
        },
        {
            tableName: 'stations',
            timestamps: false
        }
    );
    return Station;
};
