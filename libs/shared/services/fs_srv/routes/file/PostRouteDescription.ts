import { JSONSchemaType } from 'ajv';

import { IRouteDefinition } from '../../../../lib/routing/description/interfaces/IRouteDefinition';
import { IRouteDescription } from '../../../../lib/routing/description/interfaces/IRouteDescription';

import {
    Generate201ResponseSchema,
    Generate400ResponseSchema,
    Generate401ResponseSchema,
    Generate404ResponseSchema,
    Generate500ResponseSchema,
} from '../../../../lib/routing/description/ResponseDefinition';

export interface IRequestBody {
    file: string;
}

export interface IResponseBody {
    uid_file: string;
}

let requestBodySchema: JSONSchemaType<IRequestBody> = {
    type: 'object',
    properties: {
        file: {
            type: 'string',
        },
    },
    required: [
        'file',
    ],
};

let responseBodySchema: JSONSchemaType<IResponseBody> = {
    type: 'object',
    properties: {
        uid_file: {
            type: 'string',
        },
    },
    required: [
        'uid_file',
    ],
};

let routeDefinition: IRouteDefinition = {
    tags: ['File'],
    summary: 'POST file',
    description: 'Route for uploading file',
    parameters: [
        //TODO: Authorization
    ],
    requestBody: {
        content: {
            'application/octet-stream': {
                schema: requestBodySchema,
            },
        },
    },
    responses: {
        201: Generate201ResponseSchema('File uploaded successfully', responseBodySchema),
        400: Generate400ResponseSchema('Bad Request'),
        // 401: Generate401ResponseSchema('Unauthorized'),
        404: Generate404ResponseSchema('Not Found'),
        500: Generate500ResponseSchema('Internal server error'),
    },
};

export const routeDescription: IRouteDescription = {
    httpMethod: 'POST',
    endpoint: '/file',
    upload: true,
    definition: routeDefinition,
    authRequired: false, //TODO: Authorization
};
