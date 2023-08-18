export interface IBookGettingOptions {
    id_book: number;
}

export interface IBookGettingResponse {
    id_book: number;
    id_author: number;
    id_genre: number;
    author_fullname: string;
    genre_name: string;
    title: string;
    price: number;
    uid_file: string;
    info: string;
}

export interface IBookGettingRepository {
    get(options: IBookGettingOptions): Promise<IBookGettingResponse>;
}

export interface IBookGetting {
    execute(options: IBookGettingOptions): Promise<IBookGettingResponse>;
}

export class BookGetting implements IBookGetting {
    private repo: IBookGettingRepository;

    public constructor(options: {
        repo: IBookGettingRepository;
    }) {
        this.repo = options.repo;
    }

    public async execute(options: IBookGettingOptions): Promise<IBookGettingResponse> {
        this.validateOptions(options);

        return await this.repo.get({
            id_book: options.id_book,
        });
    }

    private validateOptions(options: IBookGettingOptions): void {
        if (!options.id_book) {
            throw new Error('Book Indetifier Missing');
        }
    }
}
