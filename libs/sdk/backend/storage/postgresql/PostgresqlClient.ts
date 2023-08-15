import { ModelCtor, Sequelize, Model } from 'sequelize';

import { IModel } from './model/Model';
import { IAssociation } from './model/Association';

export interface IPostgresqlClientOptions {
    db_name: string;
    db_user: string;
    db_password: string;
    db_host: string;
    db_port: number;
}

export class PostgresqlClient {
    private static instance: PostgresqlClient;

    private sequlize: Sequelize;
    private tables: Record<string, ModelCtor<Model<any, any>>>;

    private constructor(options: IPostgresqlClientOptions) {
        this.sequlize = new Sequelize(
            options.db_name,
            options.db_user,
            options.db_password,
            {
                host: options.db_host,
                port: options.db_port,
                dialect: 'postgres',
                logging: false,
            },
        );
        this.tables = {};
    }

    public static Init(options: IPostgresqlClientOptions): void {
        if (this.instance) {
            throw new Error('PostgresqlClient is already initialized');
        }

        this.instance = new PostgresqlClient(options);
    }

    public static GetInstance(): PostgresqlClient {
        if (!this.instance) {
            throw new Error('PostgresqlClient is not initialized');
        }

        return this.instance;
    }

    public registerTable(model: IModel): void {
        if (!(model.modelName in this.tables)) {
            this.tables[model.modelName] = this.sequlize.define(model.tableName, model.schema);
        } else {
            console.log(`Model with name - "${model.modelName}" is already initialized, so it was skipped`);
        }
    }

    public registerAssociation(association: IAssociation): void {
        if (!(association.mainModelName in this.tables)) {
            console.log(`Model with name - "${association.mainModelName}" is not initialized`);

            return;
        }

        if (!(association.secondaryModelName in this.tables)) {
            console.log(`Model with name - "${association.secondaryModelName}" is not initialized`);

            return;
        }

        switch (association.type) {
            case '1:1': {
                this.tables[association.mainModelName].hasOne(
                    this.tables[association.secondaryModelName],
                );

                this.tables[association.secondaryModelName].belongsTo(
                    this.tables[association.mainModelName]);
                break;
            }
            case '1:n': {
                this.tables[association.mainModelName].hasMany(
                    this.tables[association.secondaryModelName],
                );

                this.tables[association.secondaryModelName].belongsTo(
                    this.tables[association.mainModelName]);
                break;
            }
            case 'n:m': {
                this.tables[association.mainModelName].belongsToMany(
                    this.tables[association.secondaryModelName],
                    {
                        through: `${association.mainModelName}_${association.secondaryModelName}`,
                    });

                this.tables[association.secondaryModelName].belongsToMany(
                    this.tables[association.mainModelName],
                    {
                        through: `${association.mainModelName}_${association.secondaryModelName}`,
                    });
                break;
            }
            default: {
                throw new Error(`ERROR: Non-handled association type - ${association.type}`);
            }
        }
    }

    public async syncTables(): Promise<void> {
        await this.sequlize.sync({ alter: true });
    }

    public getModel(name : string): ModelCtor<Model<any, any>> {
        return this.tables[name];
    }

    public async closeConnection(): Promise<void> {
        let tablesNames = Object.keys(this.tables);
        for (let name of tablesNames) {
            await this.tables[name].drop({
                cascade: true,
            });
        }
        
        await this.sequlize.close();
    }
}
