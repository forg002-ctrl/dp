import { AuthError } from '@src/lib/errors/types/AuthError';
import { NotFoundError } from '@src/lib/errors/types/NotFoundError';
import { UserInputError } from '@src/lib/errors/types/UserInputError';

export class ErrorHandler {
    private static instance: ErrorHandler;

    private static Init(): void {
        if (this.instance) {
            throw new Error('ErrorHandler is already initialized');
        }

        this.instance = new ErrorHandler();
    }

    public static GetInstance(): ErrorHandler {
        if (!this.instance) {
            this.Init();
        }

        return this.instance;
    }

    public isAuthError(x: Error): x is AuthError {
        return x instanceof AuthError;
    }

    public isUserInputError(x: Error): x is UserInputError {
        return x instanceof UserInputError;
    }

    public isNotFoundError(x: Error): x is NotFoundError {
        return x instanceof NotFoundError;
    }
}
