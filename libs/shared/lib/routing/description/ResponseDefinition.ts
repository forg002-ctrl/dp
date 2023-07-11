import { SchemaObject } from 'ajv';
import { IResponseContent } from './interfaces/IRouteDefinition';

import {
    Response200Schema,
    Response201Schema,
    Response400Schema,
    Response401Schema,
    Response404Schema,
    Response500Schema,
} from './Responses';

export interface IResponseDefinitionOptions {
    status: number;
    description: string;
    schema: Record<string, unknown>;
}

export default class ResponseDefinition {
    private status: number;
    private description: string;
    private schema: Record<string, unknown>;

    public constructor(options: IResponseDefinitionOptions) {
        this.status = options.status;
        this.description = options.description;
        this.schema = options.schema;
    }

    public format(): IResponseContent {
        return {
            description: this.description,
            content: {
                'application/json': {
                    schema: this.schema,
                },
            },
        };
    }
}

export const Generate200ResponseSchema = (description: string, schema?: SchemaObject): IResponseContent => {
    return (new ResponseDefinition({
        status: 200,
        description: description,
        schema: schema || Response200Schema,
    })).format();
};

export const Generate201ResponseSchema = (description: string, schema?: SchemaObject): IResponseContent => {
    return (new ResponseDefinition({
        status: 201,
        description: description,
        schema: schema || Response201Schema,
    })).format();
};

export const Generate400ResponseSchema = (description: string): IResponseContent => {
    return (new ResponseDefinition({
        status: 400,
        description: description,
        schema: Response400Schema,
    })).format();
};

export const Generate401ResponseSchema = (description: string): IResponseContent => {
    return (new ResponseDefinition({
        status: 401,
        description: description,
        schema: Response401Schema,
    })).format();
};

export const Generate404ResponseSchema = (description: string): IResponseContent => {
    return (new ResponseDefinition({
        status: 404,
        description: description,
        schema: Response404Schema,
    })).format();
};

export const Generate500ResponseSchema = (description: string): IResponseContent => {
    return (new ResponseDefinition({
        status: 500,
        description: description,
        schema: Response500Schema,
    })).format();
};
