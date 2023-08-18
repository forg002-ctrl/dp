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
    removedBooks: number;
}

let responseBodySchema: JSONSchemaType<IResponseBody> = {
    type: 'object',
    properties: {
        removedBooks: {
            type: 'number',
        },
    },
    required: [
        'removedBooks',
    ],
};

let routeDefinition: IRouteDefinition = {
    tags: ['Genre'],
    summary: 'DELETE genre route',
    description: 'Route for removing the genre by id and its books',
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
        200: Generate200ResponseSchema('Genre and its books removed successfully', responseBodySchema),
        400: Generate400ResponseSchema('Bad Request'),
        401: Generate401ResponseSchema('Unauthorized'),
        404: Generate404ResponseSchema('Not Found'),
        500: Generate500ResponseSchema('Internal server error'),
    },
};

export const routeDescription: IRouteDescription = {
    httpMethod: 'DELETE',
    endpoint: '/genre/:id_genre',
    definition: routeDefinition,
    authRequired: true,
};
