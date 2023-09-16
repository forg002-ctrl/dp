import sequelize from 'sequelize';

import { Model } from '@src/ext/sdk/backend/storage/postgresql/parts/Model';

export const AuthorModel = new Model({
    tableName: 'db_authors',
    modelName: 'authors',
    schema: {
        firstname: {
            type: sequelize.STRING,
            allowNull: false,
        },
        lastname: {
            type: sequelize.STRING,
            allowNull: false,
        },
        birthdate: {
            type: sequelize.STRING,
            allowNull: false,
        },
        info: {
            type: sequelize.TEXT,
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
