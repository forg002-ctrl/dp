import { JSONSchemaType } from 'ajv';

import { IRouteDefinition } from '../../../../../lib/routing/description/interfaces/IRouteDefinition';
import { IRouteDescription } from '../../../../../lib/routing/description/interfaces/IRouteDescription';

import {
    Generate201ResponseSchema,
    Generate400ResponseSchema,
    Generate500ResponseSchema,
} from '../../../../../lib/routing/description/ResponseDefinition';

export interface IRequestBody {
  username: string;
  email: string;
  password: string;
}

export interface IResponseBody {
  id_user: number;
  username: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

let requestBodySchema: JSONSchemaType<IRequestBody> = {
    type: 'object',
    properties: {
        username: {
            type: 'string',
        },
        email: {
            type: 'string',
        },
        password: {
            type: 'string',
        },
    },
    required: [
        'username',
        'email',
        'password',
    ],
};

let responseBodySchema: JSONSchemaType<IResponseBody> = {
    type: 'object',
    properties: {
        id_user: {
            type: 'number',
        },
        username: {
            type: 'string',
        },
        email: {
            type: 'string',
        },
        createdAt: {
            type: 'object',
            required: [],
        },
        updatedAt: {
            type: 'object',
            required: [],
        },
    },
    required: ['id_user', 'username', 'email', 'createdAt', 'updatedAt'],
};

let routeDefinition: IRouteDefinition = {
    tags: ['Auth'],
    summary: 'POST Register route',
    description: 'Authentication route for singing up',
    requestBody: {
        content: {
            'application/json': {
                schema: requestBodySchema,
            },
        },
    },
    responses: {
        201: Generate201ResponseSchema(
            'User registered successfully',
            responseBodySchema,
        ),
        400: Generate400ResponseSchema('Bad Request'),
        500: Generate500ResponseSchema('Internal server error'),
    },
};

export const routeDescription: IRouteDescription = {
    httpMethod: 'POST',
    endpoint: '/auth/register',
    definition: routeDefinition,
    requestBodySchema: requestBodySchema,
    authRequired: false,
};
