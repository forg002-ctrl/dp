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
    id_author: number;
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
    tags: ['Author'],
    summary: 'DELETE author route',
    description: 'Route for removing the author by id and its books',
    parameters: [
        {
            in: 'path',
            name: 'id_author',
            description: 'Author Identifier',
            required: true,
            schema: {
                type: 'number',
            },
        },
    ],
    responses: {
        200: Generate200ResponseSchema('Author and its books removed successfully', responseBodySchema),
        400: Generate400ResponseSchema('Bad Request'),
        401: Generate401ResponseSchema('Unauthorized'),
        404: Generate404ResponseSchema('Not Found'),
        500: Generate500ResponseSchema('Internal server error'),
    },
};

export const routeDescription: IRouteDescription = {
    httpMethod: 'DELETE',
    endpoint: '/author/:id_author',
    definition: routeDefinition,
    authRequired: true,
};
