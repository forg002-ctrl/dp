import { JSONSchemaType } from 'ajv';

import { IRouteDefinition } from '../../lib/routing/description/interfaces/IRouteDefinition';
import { IRouteDescription } from '../../lib/routing/description/interfaces/IRouteDescription';

import {
    Generate201ResponseSchema,
    Generate400ResponseSchema,
    Generate401ResponseSchema,
    Generate500ResponseSchema,
} from '../../lib/routing/description/ResponseDefinition';

export interface IRequestBody {
    firstname: string;
    lastname: string;
    birthdate: string;
    info: string;
}

export interface IResponseBody {
    id_author: string;
}

let requestBodySchema: JSONSchemaType<IRequestBody> = {
    type: 'object',
    properties: {
        firstname: {
            type: 'string',
        },
        lastname: {
            type: 'string',
        },
        birthdate: {
            type: 'string',
        },
        info: {
            type: 'string',
        },
    },
    required: [
        'firstname',
        'lastname',
        'birthdate',
        'info',
    ],
};

let responseBodySchema: JSONSchemaType<IResponseBody> = {
    type: 'object',
    properties: {
        id_author: {
            type: 'string',
        },
    },
    required: [
        'id_author',
    ],
};

let routeDefinition: IRouteDefinition = {
    tags: ['Author'],
    summary: 'POST author',
    description: 'Route for author creating',
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
        201: Generate201ResponseSchema('Author created successfully', responseBodySchema),
        400: Generate400ResponseSchema('Bad Request'),
        401: Generate401ResponseSchema('Unauthorized'),
        500: Generate500ResponseSchema('Internal server error'),
    },
};

export const routeDescription: IRouteDescription = {
    httpMethod: 'POST',
    endpoint: '/author',
    definition: routeDefinition,
    authRequired: true,
};
