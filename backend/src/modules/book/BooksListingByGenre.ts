export interface IListBook {
    id_book: string;
    id_author: string;
    id_genre: string;
    author_fullname: string;
    genre_name: string;
    title: string;
    price: number;
    uid_file: string;
}

export interface IListBookByGenreOptions {
    id_genre: string;
}

export interface IListBookByGenreResponse {
    rows: IListBook[];
    rowsCount: number;
}

export interface IBooksListingByGenreRepository {
    listByGenre(options: IListBookByGenreOptions): Promise<IListBookByGenreResponse>;
}

export interface IBooksListingByGenre {
    execute(options: IListBookByGenreOptions): Promise<IListBookByGenreResponse>;
}

export class BooksListingByGenre implements IBooksListingByGenre {
    private repo: IBooksListingByGenreRepository;

    public constructor(options: {
        repo: IBooksListingByGenreRepository;
    }) {
        this.repo = options.repo;
    }

    public async execute(options: IListBookByGenreOptions): Promise<IListBookByGenreResponse> {
        this.validateOptions(options);

        return await this.repo.listByGenre({
            id_genre: options.id_genre,
        });
    }

    private validateOptions(options: IListBookByGenreOptions): void {
        if (!options.id_genre) {
            throw new Error('Genre Indentifer is missing');
        }
    }
}
