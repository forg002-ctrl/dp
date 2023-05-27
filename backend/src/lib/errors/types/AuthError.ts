export class AuthError extends Error {
    public statusCode = 401;
    public message: string;

    public constructor(message: string = 'Unauthorized') {
        super();
        this.message = message;
    }
}
