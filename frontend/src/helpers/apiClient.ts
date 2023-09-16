
import { AuthService } from "services/AuthService";
import { LocalStorage } from "helpers/localStorage";

type HttpHeaders = {
  [key: string]: string;
};

type RequestConfig = {
  headers: HttpHeaders;
};

export interface ITokenRefreshResponseBody {
  accessToken: string;
}

export interface IApiClient {
  get<TResponse>(endpoint: string): Promise<TResponse>;
  post<TRequest, TResponse>(
    endpoint: string,
    body: TRequest,
    config?: RequestConfig
  ): Promise<TResponse>;
  // patch<TRequest, TResponse>(
  //   path: string,
  //   object: TRequest
  // ): Promise<TResponse>;
  // put<TRequest, TResponse>(path: string, object: TRequest): Promise<TResponse>;
}

export interface IApiConfiguration {
  http_server: string;
}

export class ApiClient implements IApiClient {
  private http_server: string;

  public constructor(apiConfiguration: IApiConfiguration) {
    this.http_server = apiConfiguration.http_server;
  }
  
  public async get<TResponse>(endpoint: string): Promise<TResponse> {
    const response = await fetch(this.getRequestPath(endpoint), AuthService.isAuthenticated() ? {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${LocalStorage.getAccessToken()}`
      },
    } : {
      method: 'GET',
    });
    if (response.status !== 200) {
      if (response.status === 401) {
          await this.getRefreshToken();
          return await this.get(endpoint);
      }
      let json = await response.json() as IBackendError;
      //TODO: handle error
      console.log('json.err - ', json.error);
    }

    return await response.json() as TResponse;
  }

  public async post<TRequest, TResponse>(endpoint: string, body?: TRequest, config?: RequestConfig): Promise<TResponse> {
    const response = await fetch(this.getRequestPath(endpoint), AuthService.isAuthenticated() ? {
      method: 'POST',
      body: JSON.stringify(body),
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${LocalStorage.getAccessToken()}`,
      },
    } : {
      method: 'POST',
      body: JSON.stringify(body),
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    if (response.status !== 200 && response.status !== 201) {
      if (response.status === 401) {
        await this.getRefreshToken();
        return await this.post(endpoint, body, config);
      }
      let json = await response.json() as IBackendError;
      //TODO: handle error
      console.log('json.err - ', json.error);
    }

    let json = await response.json() as TResponse;

    return json;
  }

  private async getRefreshToken(): Promise<void> {
    LocalStorage.removeAccessToken();

    const response = await fetch(this.getRequestPath('/token/refresh'), {
      method: 'POST',
      credentials: 'include',
    });
    if (response.status !== 201) {
      let error = await response.json() as IBackendError;
      throw new Error(error.error);
      //TODO: handle error
    }

    let json = await response.json() as ITokenRefreshResponseBody;
    LocalStorage.setAccessToken(json.accessToken);
  }
 
  private getRequestPath(endpoint: string): string {
    return `${this.http_server}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
  }
}