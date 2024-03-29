import { ModelAttributes } from 'sequelize/types/model';

import { PostgresqlClient } from '../PostgresqlClient';

export interface IModel {
    tableName: string;
    modelName: string;
    schema: ModelAttributes;
}

export class Model implements IModel {
    public tableName: string;
    public modelName: string;
    public schema: ModelAttributes;

    public constructor(options: IModel) {
        this.tableName = options.tableName;
        this.modelName = options.modelName;
        this.schema = options.schema;
    }

    public registerModel(postgresqlClient: PostgresqlClient): void {
        postgresqlClient.registerTable({
            tableName: this.tableName,
            modelName: this.modelName,
            schema: this.schema,
        });
    }
}
