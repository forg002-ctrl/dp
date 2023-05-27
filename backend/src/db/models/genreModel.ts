import sequelize from 'sequelize';

import { Model } from '@src/lib/app/model/Model';

export const GenreModel = new Model({
    tableName: 'db_genres',
    modelName: 'genres',
    schema: {
        name: {
            type: sequelize.STRING,
            unique: true,
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
