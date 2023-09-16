import sequelize from 'sequelize';

import { Model } from '@src/ext/sdk/backend/storage/postgresql/parts/Model';

export const BookModel = new Model({
    tableName: 'db_books',
    modelName: 'books',
    schema: {
        title: {
            type: sequelize.STRING,
            allowNull: false,
        },
        price: {
            type: sequelize.DOUBLE,
            allowNull: false,
        },
        info: {
            type: sequelize.TEXT,
        },
        uid_file: {
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
