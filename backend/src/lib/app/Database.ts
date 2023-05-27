import { ModelCtor, Sequelize, Model } from 'sequelize';

import { Config } from '@src/lib/app/Config';
import { IModel } from '@src/lib/app/model/Model';
import { IAssociation } from '@src/lib/app/model/Association';

export class Database {
    private static instance: Database;

    private sequlize: Sequelize;
    private tables: Record<string, ModelCtor<Model<any, any>>>;

    private constructor() {
        this.sequlize = new Sequelize(
            Config.DB_NAME,
            Config.DB_USER,
            Config.DB_PASSWORD,
            {
                host: Config.DB_HOST,
                dialect: 'postgres',
                logging: false,
            },
        );
        this.tables = {};
    }

    private static Init(): void {
        if (this.instance) {
            throw new Error('Database is already initialized');
        }

        this.instance = new Database();
    }

    public static GetInstance(): Database {
        if (!this.instance) {
            this.Init();
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

    private getTables(): Record<string, ModelCtor<Model<any, any>>> {
        return this.tables;
    }

    public getSequlize(): Sequelize {
        return this.sequlize;
    }

    public getModel(name : string): ModelCtor<Model<any, any>> {
        return this.getTables()[name];
    }
}
