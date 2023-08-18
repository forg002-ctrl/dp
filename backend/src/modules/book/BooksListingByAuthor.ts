export interface IListBook {
    id_book: number;
    id_author: number;
    id_genre: number;
    author_fullname: string;
    genre_name: string;
    title: string;
    price: number;
    uid_file: string;
}

export interface IListBookByAuthorOptions {
    id_author: number;
}

export interface IListBookByAuthorResponse {
    rows: IListBook[];
    rowsCount: number;
}

export interface IBooksListingByAuthorRepository {
    listByAuthor(options: IListBookByAuthorOptions): Promise<IListBookByAuthorResponse>;
}

export interface IBooksListingByAuthor {
    execute(options: IListBookByAuthorOptions): Promise<IListBookByAuthorResponse>;
}

export class BooksListingByAuthor implements IBooksListingByAuthor {
    private repo: IBooksListingByAuthorRepository;

    public constructor(options: {
        repo: IBooksListingByAuthorRepository;
    }) {
        this.repo = options.repo;
    }

    public async execute(options: IListBookByAuthorOptions): Promise<IListBookByAuthorResponse> {
        this.validateOptions(options);

        return await this.repo.listByAuthor({
            id_author: options.id_author,
        });
    }

    private validateOptions(options: IListBookByAuthorOptions): void {
        if (!options.id_author) {
            throw new Error('Author Indentifer is missing');
        }
    }
}
