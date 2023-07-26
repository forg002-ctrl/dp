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
    tags: ['File'],
    summary: 'DELETE file',
    description: 'Route for removing file by id',
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
        200: Generate201ResponseSchema('File removed successfully', responseBodySchema),
        400: Generate400ResponseSchema('Bad Request'),
        404: Generate404ResponseSchema('Not Found'),
        500: Generate500ResponseSchema('Internal server error'),
    },
};

export const routeDescription: IRouteDescription = {
    httpMethod: 'DELETE',
    endpoint: '/file/:uid_file',
    definition: routeDefinition,
    authRequired: false, // TODO: Authorization
};
