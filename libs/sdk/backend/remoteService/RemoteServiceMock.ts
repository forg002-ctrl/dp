import FormData from 'form-data';
import { HTTP_METHODS } from '../app/route/description/interfaces/IRouteDescription';

import { IRemoteService, IRemoteResponse } from './RemoteService';

type FetchMethodType = (method: string, path: string, body?: Record<string, unknown> | FormData) => Promise<IRemoteResponse>;

interface IRemoteServiceMockOptions {
    serviceName: string;
}

export class RemoteServiceMock implements IRemoteService {
    private fetchMethod: FetchMethodType;
    private serviceName: string;

    public constructor(options: IRemoteServiceMockOptions, fetchMethod: FetchMethodType) { //TODO: Service authentication via token
        // get service data via serviceName
        this.serviceName = options.serviceName;
        this.fetchMethod = fetchMethod;
    }
    
    private async fetch(method: HTTP_METHODS, endpoint: string, data?: Record<string, unknown> | FormData, additionalHeaders?: Record<string, unknown>): Promise<IRemoteResponse> {
        return this.fetchMethod(method, endpoint, data);
    }

    public async get(endpoint: string): Promise<IRemoteResponse> {
        return this.fetch('GET', endpoint);
    }

    public async post(endpoint: string, data?: Record<string, unknown> | FormData, headers?: Record<string, unknown>): Promise<IRemoteResponse> {
        return this.fetch('POST', endpoint, data, headers);
    }

    public async put(endpoint: string, data?: Record<string, unknown> | FormData): Promise<IRemoteResponse> {
        return this.fetch('PUT', endpoint, data);
    }

    public async delete(endpoint: string): Promise<IRemoteResponse> {
        return this.fetch('DELETE', endpoint);
    }

    public getServiceName(): string {
        return this.serviceName;
    }
}