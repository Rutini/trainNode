'use strict';
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: DataTypes.STRING
            },
            email: {
                type: DataTypes.STRING
            },
            password: {
                type: DataTypes.STRING
            },
            credentials: {
                type: DataTypes.INTEGER
            },
            created_at: {
                type: DataTypes.DATE
            }
        },
        {
            tableName: 'users',
            timestamps: false
        }
    );
    return User;
};
