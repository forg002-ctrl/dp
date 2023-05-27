import sequelize from 'sequelize';

import { Model } from '@src/lib/app/model/Model';

export const UserModel = new Model({
    tableName: 'db_users',
    modelName: 'users',
    schema: {
        username: {
            type: sequelize.STRING,
            unique: true,
            allowNull: false,
        },
        email: {
            type: sequelize.STRING,
            unique: true,
            allowNull: false,
        },
        password: {
            type: sequelize.STRING,
            allowNull: false,
        },
        createdAt: {
            type: 'TIMESTAMP',
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false,
        },
        updatedAt: {
            type: 'TIMESTAMP',
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false,
        },
    },
});
