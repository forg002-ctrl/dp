export interface IAuthorGettingOptions {
    id_author: number;
}

export interface IAuthorGettingResponse {
    id_author: number;
    firstname: string;
    lastname: string;
    birthdate: string;
    info: string;
    booksCount: number;
}

export interface IAuthorGettingRepository {
    get(options: IAuthorGettingOptions): Promise<IAuthorGettingResponse>;
}

export interface IAuthorGetting {
    execute(options: IAuthorGettingOptions): Promise<IAuthorGettingResponse>;
}

export class AuthorGetting implements IAuthorGetting {
    private repo: IAuthorGettingRepository;

    public constructor(options: {
        repo: IAuthorGettingRepository;
    }) {
        this.repo = options.repo;
    }

    public async execute(options: IAuthorGettingOptions): Promise<IAuthorGettingResponse> {
        this.validateOptions(options);

        return await this.repo.get({
            id_author: options.id_author,
        });
    }

    private validateOptions(options: IAuthorGettingOptions): void {
        if (!options.id_author) {
            throw new Error('Author Indetifier Missing');
        }
    }
}
