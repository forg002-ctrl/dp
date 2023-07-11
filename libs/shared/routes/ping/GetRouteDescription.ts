import { JSONSchemaType } from 'ajv';

import { IRouteDefinition } from '../../lib/routing/description/interfaces/IRouteDefinition';
import { IRouteDescription } from '../../lib/routing/description/interfaces/IRouteDescription';

import {
    Generate200ResponseSchema,
    Generate500ResponseSchema,
} from '../../lib/routing/description/ResponseDefinition';

export interface IRequestBody {}

export interface IResponseBody {
    response: string;
}

let responseBodySchema: JSONSchemaType<IResponseBody> = {
    type: 'object',
    properties: {
        response: {
            type: 'string',
        },
    },
    required: [
        'response',
    ],
};

let routeDefinition: IRouteDefinition = {
    tags: ['Test'],
    summary: 'GET ping route',
    description: 'Testing ping route',
    responses: {
        200: Generate200ResponseSchema('Pong', responseBodySchema),
        500: Generate500ResponseSchema('Internal server error'),
    },
};

export const routeDescription: IRouteDescription = {
    httpMethod: 'GET',
    endpoint: '/ping',
    definition: routeDefinition,
    authRequired: false,
};
