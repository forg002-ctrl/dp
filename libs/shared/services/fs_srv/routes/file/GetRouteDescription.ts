import { JSONSchemaType } from 'ajv';

import { IRouteDefinition } from '../../../../lib/routing/description/interfaces/IRouteDefinition';
import { IRouteDescription } from '../../../../lib/routing/description/interfaces/IRouteDescription';

import {
    Generate201ResponseSchema,
    Generate400ResponseSchema,
    Generate404ResponseSchema,
    Generate500ResponseSchema,
} from '../../../../lib/routing/description/ResponseDefinition';

export interface IRequestParams {
    uid_file: string;
}

export interface IResponseBody {
    file: string;
}

let responseBodySchema: JSONSchemaType<IResponseBody> = {
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

let routeDefinition: IRouteDefinition = {
    tags: ['File'],
    summary: 'GET file',
    description: 'Route for getting file',
    parameters: [
        {
            in: 'path',
            name: 'uid_file',
            description: 'File Identifier',
            required: true,
            schema: {
                uid_file: {
                    type: 'string',
                },
            },
        },
    ],
    responses: {
        200: Generate201ResponseSchema('File got successfully', responseBodySchema),
        400: Generate400ResponseSchema('Bad Request'),
        404: Generate404ResponseSchema('Not Found'),
        500: Generate500ResponseSchema('Internal server error'),
    },
};

export const routeDescription: IRouteDescription = {
    httpMethod: 'GET',
    endpoint: '/file/:uid_file',
    definition: routeDefinition,
    authRequired: false,
};
