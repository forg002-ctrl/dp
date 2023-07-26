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
    success: boolean;
}

let responseBodySchema: JSONSchemaType<IResponseBody> = {
    type: 'object',
    properties: {
        success: {
            type: 'boolean',
        },
    },
    required: [
        'success',
    ],
};

let routeDefinition: IRouteDefinition = {
    tags: ['Book'],
    summary: 'DELETE book route',
    description: 'Route for removing the book by id',
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
        200: Generate200ResponseSchema('Book removed successfully', responseBodySchema),
        400: Generate400ResponseSchema('Bad Request'),
        401: Generate401ResponseSchema('Unauthorized'),
        404: Generate404ResponseSchema('Not Found'),
        500: Generate500ResponseSchema('Internal server error'),
    },
};

export const routeDescription: IRouteDescription = {
    httpMethod: 'DELETE',
    endpoint: '/book/:id_book',
    definition: routeDefinition,
    authRequired: true,
};
