import { SchemaObject } from 'ajv';

import { HTTP_METHODS } from '@src/lib/app/route/Route';
import { IRouteDefinition } from '@src/lib/app/route/description/interfaces/IRouteDefinition';

export interface IRouteDescription {
    httpMethod: HTTP_METHODS;
    endpoint: string;
    requestBodySchema?: SchemaObject;
    definition: IRouteDefinition;
    authRequired: boolean;
}
