import { ApiClient } from "helpers/apiClient";
import { LocalStorage } from "helpers/localStorage";

interface ILoginData {
    username: string;
    password: string;
}

interface ILoginResponse {
    user: IUser;
    accessToken: string;
}

export class AuthService {
    private apiClient: ApiClient;

    public constructor() {
        this.apiClient = new ApiClient({
            http_server: 'http://localhost:3001',
        });
    }

    // public async register(data: ILoginData): Promise<ILoginResponse> {
    //     return await this.apiClient.post<ILoginData, ILoginResponse>('/auth/register', {...data});
    // }

    public async login(data: ILoginData): Promise<ILoginResponse> {
        let response = await this.apiClient.post<ILoginData, ILoginResponse>('/auth/login', {...data});

        return response;
    }

    public static isAuthenticated = (): boolean => {
        return LocalStorage.getAccessToken() ? true : false;
    }
}
