import { JSONSchemaType } from 'ajv';

import { IRouteDefinition } from '../../lib/routing/description/interfaces/IRouteDefinition';
import { IRouteDescription } from '../../lib/routing/description/interfaces/IRouteDescription';

import {
    Generate201ResponseSchema,
    Generate400ResponseSchema,
    Generate401ResponseSchema,
    Generate500ResponseSchema,
} from '../../lib/routing/description/ResponseDefinition';

export interface IRequestBody {}

export interface IResponseBody {
    accessToken: string;
}

let responseBodySchema: JSONSchemaType<IResponseBody> = {
    type: 'object',
    properties: {
        accessToken: {
            type: 'string',
        },
    },
    required: [
        'accessToken',
    ],
};

let routeDefinition: IRouteDefinition = {
    tags: ['Token'],
    summary: 'POST refresh token',
    description: 'Route for refreshing access token',
    parameters: [
        {
            name: 'x-refresh-token',
            in: 'cookie',
            required: true,
            description: 'The api refresh token for generating of access token',
            schema: {
                type: 'string',
            },
        },
    ],
    responses: {
        201: Generate201ResponseSchema('Access token refreshed successfully', responseBodySchema),
        400: Generate400ResponseSchema('Bad Request'),
        401: Generate401ResponseSchema('Unauthorized'),
        500: Generate500ResponseSchema('Internal server error'),
    },
};

export const routeDescription: IRouteDescription = {
    httpMethod: 'POST',
    endpoint: '/token/refresh',
    definition: routeDefinition,
    authRequired: false,
};
