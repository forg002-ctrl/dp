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
    id_genre: number;
}

export interface IResponseBody {
    id_genre: number;
    name: string;
    booksCount: number;
}

let responseBodySchema: JSONSchemaType<IResponseBody> = {
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
};

let routeDefinition: IRouteDefinition = {
    tags: ['Genre'],
    summary: 'GET genre route',
    description: 'Route for getting genre information',
    parameters: [
        {
            in: 'path',
            name: 'id_genre',
            description: 'Genre Identifier',
            required: true,
            schema: {
                type: 'number',
            },
        },
    ],
    responses: {
        200: Generate200ResponseSchema('Genre found successfully', responseBodySchema),
        400: Generate400ResponseSchema('Bad Request'),
        401: Generate401ResponseSchema('Unauthorized'),
        404: Generate404ResponseSchema('Not Found'),
        500: Generate500ResponseSchema('Internal server error'),
    },
};

export const routeDescription: IRouteDescription = {
    httpMethod: 'GET',
    endpoint: '/genre/:id_genre',
    definition: routeDefinition,
    authRequired: true,
};
