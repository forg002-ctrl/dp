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

export interface IListBook {
    id_book: string;
    id_author: string;
    id_genre: string;
    author_fullname: string;
    genre_name: string;
    title: string;
    price: number;
    uid_file: string;
}

export interface IResponseBody {
    rows: IListBook[];
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
                    id_book: {
                        type: 'string',
                    },
                    id_author: {
                        type: 'string',
                    },
                    id_genre: {
                        type: 'string',
                    },
                    author_fullname: {
                        type: 'string',
                    },
                    genre_name: {
                        type: 'string',
                    },
                    title: {
                        type: 'string',
                    },
                    price: {
                        type: 'number',
                    },
                    uid_file: {
                        type: 'string',
                    },
                },
                required: [
                    'id_book',
                    'id_author',
                    'id_genre',
                    'author_fullname',
                    'genre_name',
                    'title',
                    'price',
                    'uid_file',
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
    tags: ['Book'],
    summary: 'GET list books route',
    description: 'Route for listing books',
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
        200: Generate200ResponseSchema('Books listed successfully', responseBodySchema),
        400: Generate400ResponseSchema('Bad Request'),
        401: Generate401ResponseSchema('Unauthorized'),
        404: Generate404ResponseSchema('Not Found'),
        500: Generate500ResponseSchema('Internal server error'),
    },
};

export const routeDescription: IRouteDescription = {
    httpMethod: 'GET',
    endpoint: '/books',
    definition: routeDefinition,
    authRequired: true,
};
