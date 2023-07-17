import sequelize from 'sequelize';

import { Model } from '@src/ext/sdk/backend/storage/postgresql/model/Model';

export const SessionModel = new Model({
    tableName: 'db_sessions',
    modelName: 'sessions',
    schema: {
        createdAt: {
            type: 'TIMESTAMP',
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false,
        },
    },
});
