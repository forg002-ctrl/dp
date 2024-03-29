import { JSONSchemaType } from 'ajv';

import { IRouteDefinition } from '../../../../lib/routing/description/interfaces/IRouteDefinition';
import { IRouteDescription } from '../../../../lib/routing/description/interfaces/IRouteDescription';

import {
    Generate200ResponseSchema,
    Generate400ResponseSchema,
    Generate401ResponseSchema,
    Generate404ResponseSchema,
    Generate500ResponseSchema,
} from '../../../../lib/routing/description/ResponseDefinition';

export interface IListQuery {
    search?: string;
}

export interface IListGenre {
    id_genre: number;
    name: string;
    booksCount: number;
}

export interface IResponseBody {
    rows: IListGenre[];
    rowsCount: number;
}

let responseBodySchema: JSONSchemaType<IResponseBody> = {
    type: 'object',
    properties: {
        rows: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    id_genre: {
                        type: 'number',
                    },
                    name: {
                        type: 'string',
                    },
                    booksCount: {
                        type: 'number',
                    },
                },
                required: [
                    'id_genre',
                    'name',
                    'booksCount',
                ],
            },
        },
        rowsCount: {
            type: 'number',
        },
    },
    required: [
        'rows',
        'rowsCount',
    ],
};

let routeDefinition: IRouteDefinition = {
    tags: ['Genre'],
    summary: 'GET list genres route',
    description: 'Route for listing genres',
    parameters: [
        {
            in: 'query',
            name: 'search',
            required: false,
            description: 'Search string',
            schema: {
                type: 'string',
            },
        },
    ],
    responses: {
        200: Generate200ResponseSchema('Genres listed successfully', responseBodySchema),
        400: Generate400ResponseSchema('Bad Request'),
        401: Generate401ResponseSchema('Unauthorized'),
        404: Generate404ResponseSchema('Not Found'),
        500: Generate500ResponseSchema('Internal server error'),
    },
};

export const routeDescription: IRouteDescription = {
    httpMethod: 'GET',
    endpoint: '/genres',
    definition: routeDefinition,
    authRequired: true,
};
