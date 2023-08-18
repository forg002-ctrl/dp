import { JSONSchemaType } from 'ajv';

import { IRouteDefinition } from '../../../../lib/routing/description/interfaces/IRouteDefinition';
import { IRouteDescription } from '../../../../lib/routing/description/interfaces/IRouteDescription';

import {
    Generate201ResponseSchema,
    Generate400ResponseSchema,
    Generate401ResponseSchema,
    Generate404ResponseSchema,
    Generate500ResponseSchema,
} from '../../../../lib/routing/description/ResponseDefinition';

export interface IRequestBody {
    id_genre: number;
    id_author: number;
    title: string;
    price: number;
    info: string;
}

export interface IResponseBody {
    id_book: number;
}

let requestBodySchema: JSONSchemaType<IRequestBody> = {
    type: 'object',
    properties: {
        id_genre: {
            type: 'number',
        },
        id_author: {
            type: 'number',
        },
        title: {
            type: 'string',
        },
        price: {
            type: 'number',
        },
        info: {
            type: 'string',
        },
    },
    required: [
        'id_genre',
        'id_author',
        'title',
        'price',
        'info',
    ],
};

let responseBodySchema: JSONSchemaType<IResponseBody> = {
    type: 'object',
    properties: {
        id_book: {
            type: 'number',
        },
    },
    required: [
        'id_book',
    ],
};

let routeDefinition: IRouteDefinition = {
    tags: ['Book'],
    summary: 'POST book',
    description: 'Route for book creating',
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
        201: Generate201ResponseSchema('Book created successfully', responseBodySchema),
        400: Generate400ResponseSchema('Bad Request'),
        401: Generate401ResponseSchema('Unauthorized'),
        404: Generate404ResponseSchema('Not Found'),
        500: Generate500ResponseSchema('Internal server error'),
    },
};

export const routeDescription: IRouteDescription = {
    httpMethod: 'POST',
    endpoint: '/book',
    upload: true,
    definition: routeDefinition,
    authRequired: true,
};
