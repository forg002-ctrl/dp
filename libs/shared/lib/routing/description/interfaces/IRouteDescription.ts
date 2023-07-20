import { SchemaObject } from 'ajv';

import { IRouteDefinition } from './IRouteDefinition';

export type HTTP_METHODS = 'POST' | 'GET' | 'PUT' | 'DELETE';

export interface IRouteDescription {
    httpMethod: HTTP_METHODS;
    endpoint: string;
    requestBodySchema?: SchemaObject;
    definition: IRouteDefinition;
    authRequired: boolean;
    upload?: boolean;
}
