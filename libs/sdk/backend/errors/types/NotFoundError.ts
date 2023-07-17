export class NotFoundError extends Error {
    public statusCode = 404;
    public message: string;

    public constructor(message: string = 'Not found') {
        super();
        this.message = message;
    }
}
