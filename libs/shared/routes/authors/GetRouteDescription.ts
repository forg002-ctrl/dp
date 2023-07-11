import { JSONSchemaType } from 'ajv';

import { IRouteDefinition } from '../../lib/routing/description/interfaces/IRouteDefinition';
import { IRouteDescription } from '../../lib/routing/description/interfaces/IRouteDescription';

import {
    Generate200ResponseSchema,
    Generate400ResponseSchema,
    Generate401ResponseSchema,
    Generate404ResponseSchema,
    Generate500ResponseSchema,
} from '../../lib/routing/description/ResponseDefinition';

export interface IListAuthor {
    id_author: string;
    firstname: string;
    lastname: string;
    booksCount: number;
}

export interface IResponseBody {
    rows: IListAuthor[];
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
                    id_author: {
                        type: 'string',
                    },
                    firstname: {
                        type: 'string',
                    },
                    lastname: {
                        type: 'string',
                    },
                    booksCount: {
                        type: 'number',
                    },
                },
                required: [
                    'id_author',
                    'firstname',
                    'lastname',
                    'booksCount',
                ],
            }
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
    tags: ['Author'],
    summary: 'GET list authors route',
    description: 'Route for listing authors',
    responses: {
        200: Generate200ResponseSchema('Authors listed successfully', responseBodySchema),
        400: Generate400ResponseSchema('Bad Request'),
        401: Generate401ResponseSchema('Unauthorized'),
        404: Generate404ResponseSchema('Not Found'),
        500: Generate500ResponseSchema('Internal server error'),
    },
};

export const routeDescription: IRouteDescription = {
    httpMethod: 'GET',
    endpoint: '/authors',
    definition: routeDefinition,
    authRequired: true,
};
