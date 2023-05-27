import { JSONSchemaType } from 'ajv';

export interface IResponse200 {
    success: boolean;
}

export interface IResponse201 {
    success: boolean;
}

export interface IResponse400 {
    errors: string[];
}

export interface IResponse401 {}

export interface IResponse404 {}

export interface IResponse500 {
    errors: string[];
}

export const Response200Schema: JSONSchemaType<IResponse200> = {
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

export const Response201Schema: JSONSchemaType<IResponse201> = {
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

export const Response400Schema: JSONSchemaType<IResponse400> = {
    type: 'object',
    properties: {
        errors: {
            type: 'array',
            items: {
                description: 'Error Message',
                type: 'string',
            },
        },
    },
    required: [
        'errors',
    ],
};

export const Response401Schema: JSONSchemaType<IResponse401> = {
    type: 'object',
    properties: {},
    required: [],
};

export const Response404Schema: JSONSchemaType<IResponse404> = {
    type: 'object',
    properties: {},
    required: [],
};

export const Response500Schema: JSONSchemaType<IResponse500> = {
    type: 'object',
    properties: {
        errors: {
            type: 'array',
            items: {
                description: 'Error Message',
                type: 'string',
            },
        },
    },
    required: [
        'errors',
    ],
};
