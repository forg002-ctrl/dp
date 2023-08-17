import axios, { AxiosHeaders, AxiosRequestConfig } from 'axios';
import FormData from 'form-data';
import { HTTP_METHODS } from '../app/route/description/interfaces/IRouteDescription';

export interface IRemoteService {
    getServiceName(): string;
    get(endpoint: string): Promise<IRemoteResponse>;
    post(endpoint: string, data: Record<string, unknown> | FormData, headers?: Record<string, unknown>): Promise<IRemoteResponse>;
    put(endpoint: string, data: Record<string, unknown> | FormData): Promise<IRemoteResponse>;
    delete(endpoint: string): Promise<IRemoteResponse>;
}

export interface IRemoteResponse {
    status: number;
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
        let headers: AxiosHeaders;
        if (additionalHeaders) {
            headers = new AxiosHeaders({
                'Content-Type': 'application/json',
                ...additionalHeaders,
            });
        } else {
            headers = new AxiosHeaders({
                'Content-Type': 'application/json',
            });
        }
        
        let requestConfig: AxiosRequestConfig = {
            method: method,
            url: endpoint.startsWith('/') ? `http://fs_srv:3003${endpoint}` : `http://fs_srv:3003/${endpoint}`,
            headers: headers,
        };
        if (data) {
            requestConfig['data'] = data;
        }
        try {
            console.log(requestConfig);
            return await axios(requestConfig);
        } catch (err) {
            // console.log(err);
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