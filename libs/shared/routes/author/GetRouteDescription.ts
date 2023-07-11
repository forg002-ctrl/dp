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

export interface IRequestParams {
    id_author: string;
}

export interface IResponseBody {
    id_author: string;
    firstname: string;
    lastname: string;
    birthdate: string;
    info: string;
    booksCount: number;
}

let responseBodySchema: JSONSchemaType<IResponseBody> = {
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
        birthdate: {
            type: 'string',
        },
        info: {
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
        'birthdate',
        'info',
        'booksCount',
    ],
};

let routeDefinition: IRouteDefinition = {
    tags: ['Author'],
    summary: 'GET author route',
    description: 'Route for getting author information',
    parameters: [
        {
            in: 'path',
            name: 'id_author',
            description: 'Author Identifier',
            required: true,
            schema: {
                type: 'string',
            },
        },
    ],
    responses: {
        200: Generate200ResponseSchema('Author found successfully', responseBodySchema),
        400: Generate400ResponseSchema('Bad Request'),
        401: Generate401ResponseSchema('Unauthorized'),
        404: Generate404ResponseSchema('Not Found'),
        500: Generate500ResponseSchema('Internal server error'),
    },
};

export const routeDescription: IRouteDescription = {
    httpMethod: 'GET',
    endpoint: '/author/:id_author',
    definition: routeDefinition,
    authRequired: true,
};
