export class LocalStorage {
    public static setAccessToken = (token: string) => {
        localStorage.setItem('accessToken', token);
    }
    public static getAccessToken = () => localStorage.getItem('accessToken');
    public static removeAccessToken = () => localStorage.removeItem('accessToken');
    
    public static setUser = (user: IUser) => localStorage.setItem('user', JSON.stringify(user));
    public static getUser = () => localStorage.getItem('user');

    public static removeLocalData = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('accessToken');
    };
}
