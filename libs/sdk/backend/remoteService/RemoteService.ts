import FormData from 'form-data';
import { HTTP_METHODS } from '../app/route/description/interfaces/IRouteDescription';
import fetch from 'node-fetch';

export interface IRemoteService {
    getServiceName(): string;
    get(endpoint: string): Promise<IRemoteResponse>;
    post(endpoint: string, data: Record<string, unknown> | FormData, headers?: Record<string, unknown>): Promise<IRemoteResponse>;
    put(endpoint: string, data: Record<string, unknown> | FormData): Promise<IRemoteResponse>;
    delete(endpoint: string): Promise<IRemoteResponse>;
}

export interface IRemoteResponse {
    status: number;
    json(): Promise<Record<string, unknown>>;
    json<T>(): Promise<T>;
}

interface IRemoteServiceOptions {
    serviceName: string;
}

export class RemoteService implements IRemoteService {
    private serviceName: string;
    
    public constructor(options: IRemoteServiceOptions) { //TODO: Service authentication via token
        // get service data via serviceName
        this.serviceName = options.serviceName;
    }
    
    private async fetch(method: HTTP_METHODS, endpoint: string, data?: Record<string, unknown> | FormData, additionalHeaders?: Record<string, unknown>): Promise<IRemoteResponse> {
        let headers: Record<string, unknown> = {};
        
        if (data && data instanceof FormData) {
            if (additionalHeaders) {
                headers = {
                    ...additionalHeaders,
                };
            }
        } else {
            if (additionalHeaders) {
                headers = {
                    'Content-Type': 'application/json',
                    ...additionalHeaders,
                };
            } else {
                headers = {
                    'Content-Type': 'application/json',
                };
            }
        }

        let url: string = endpoint.startsWith('/') ? `http://fs_srv:3003${endpoint}` : `http://fs_srv:3003/${endpoint}`;
        let requestConfig: any = {
            method: method,
            credentials: 'include',
            mode: 'cors',
            cache: 'no-cache',
            keepalive: true,
            headers: headers,
        };
        if (data) {
            requestConfig['body'] = data;
        }

        try {
            return fetch(url, requestConfig) as unknown as IRemoteResponse;
        } catch (err) {
            throw err;
        }
    }

    public async get(endpoint: string): Promise<IRemoteResponse> {
        return this.fetch('GET', endpoint);
    }

    public async post(endpoint: string, data: Record<string, unknown> | FormData, headers?: Record<string, unknown>): Promise<IRemoteResponse> {
        return this.fetch('POST', endpoint, data, headers);
    }

    public async put(endpoint: string, data: Record<string, unknown> | FormData): Promise<IRemoteResponse> {
        return this.fetch('PUT', endpoint, data);
    }

    public async delete(endpoint: string): Promise<IRemoteResponse> {
        return this.fetch('DELETE', endpoint);
    }

    public getServiceName(): string {
        return this.serviceName;
    }
}