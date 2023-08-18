import { JSONSchemaType } from 'ajv';

import { IRouteDefinition } from '../../../../lib/routing/description/interfaces/IRouteDefinition';
import { IRouteDescription } from '../../../../lib/routing/description/interfaces/IRouteDescription';

import {
    Generate201ResponseSchema,
    Generate400ResponseSchema,
    Generate401ResponseSchema,
    Generate500ResponseSchema,
} from '../../../../lib/routing/description/ResponseDefinition';

export interface IRequestBody {
    name: string;
}

export interface IResponseBody {
    id_genre: number;
}

let requestBodySchema: JSONSchemaType<IRequestBody> = {
    type: 'object',
    properties: {
        name: {
            type: 'string',
        },
    },
    required: [
        'name',
    ],
};

let responseBodySchema: JSONSchemaType<IResponseBody> = {
    type: 'object',
    properties: {
        id_genre: {
            type: 'number',
        },
    },
    required: [
        'id_genre',
    ],
};

let routeDefinition: IRouteDefinition = {
    tags: ['Genre'],
    summary: 'POST genre',
    description: 'Route for genre creating',
    parameters: [
        {
            name: 'authorization',
            in: 'header',
            required: true,
            description: 'Bearer access token',
            schema: {
                type: 'string',
            },
        },
    ],
    requestBody: {
        content: {
            'application/json': {
                schema: requestBodySchema,
            },
        },
    },
    responses: {
        201: Generate201ResponseSchema('Genre created successfully', responseBodySchema),
        400: Generate400ResponseSchema('Bad Request'),
        401: Generate401ResponseSchema('Unauthorized'),
        500: Generate500ResponseSchema('Internal server error'),
    },
};

export const routeDescription: IRouteDescription = {
    httpMethod: 'POST',
    endpoint: '/genre',
    definition: routeDefinition,
    authRequired: true,
};
