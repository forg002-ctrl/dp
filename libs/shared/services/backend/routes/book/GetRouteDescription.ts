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

export interface IRequestParams {
    id_book: string;
}

export interface IResponseBody {
    id_book: string;
    id_author: string;
    id_genre: string;
    author_fullname: string;
    genre_name: string;
    title: string;
    price: number;
    uid_file: string;
    info: string;
}

let responseBodySchema: JSONSchemaType<IResponseBody> = {
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
        info: {
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
        'info',
    ],
};

let routeDefinition: IRouteDefinition = {
    tags: ['Author'],
    summary: 'GET author route',
    description: 'Route for getting author information',
    parameters: [
        {
            in: 'path',
            name: 'id_book',
            description: 'Book Identifier',
            required: true,
            schema: {
                type: 'string',
            },
        },
    ],
    responses: {
        200: Generate200ResponseSchema('Book found successfully', responseBodySchema),
        400: Generate400ResponseSchema('Bad Request'),
        401: Generate401ResponseSchema('Unauthorized'),
        404: Generate404ResponseSchema('Not Found'),
        500: Generate500ResponseSchema('Internal server error'),
    },
};

export const routeDescription: IRouteDescription = {
    httpMethod: 'GET',
    endpoint: '/book/:id_book',
    definition: routeDefinition,
    authRequired: true,
};
