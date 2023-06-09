import sequelize from 'sequelize';

import { Model } from '@src/lib/app/model/Model';

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
        imageName: {
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
