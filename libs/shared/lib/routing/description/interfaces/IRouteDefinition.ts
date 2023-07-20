import { SchemaObject } from 'ajv';

interface ISchemaBody {
    schema: SchemaObject;
}

export interface IRequestContent {
    content: {
        'application/json'?: ISchemaBody;
        'application/octet-stream'?: ISchemaBody;
    };
}

export interface IResponseContent extends IRequestContent {
    description: string;
}

export interface IParam {
    in: 'query' | 'path' | 'header' | 'cookie';
    name: string;
    description: string;
    required: boolean;
    schema: SchemaObject;
}

export interface IRouteDefinition {
    tags: string[];
    summary: string;
    description: string;
    parameters?: IParam[];
    requestBody?: IRequestContent;
    responses: Record<number, IResponseContent>;
}
