import swaggerJsDoc, { Information, Options } from 'swagger-jsdoc';

export interface IDocumentationOptions {
    basepath: string;
    information: Information;
}

export class Documentation {
    private basePath: string;
    private information: Information;
    private endpoints: Record<string, Record<string, unknown>>;

    public constructor(options: IDocumentationOptions) {
        this.basePath = options.basepath;
        this.information = options.information;
        this.endpoints = {};
    }

    public addEnpoint(endpoint: string, description: Record<string, unknown>): void {
        this.endpoints[endpoint] = description;
    }

    public getApiOptions(): Options {
        return {
            swaggerDefinition: {
                openapi: '3.0.0',
                info: this.information,
                basePath: this.basePath,
                schemes: ['http'],
                produces: ['application/json'],
                paths: this.endpoints,
            },
            apis: [],
        };
    }

    public getSwaggerJsDoc(): Record<string, unknown> {
        return swaggerJsDoc(this.getApiOptions()) as Record<string, unknown>;
    }
}
