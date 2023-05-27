export interface IListGenre {
    id_genre: string;
    name: string;
    booksCount: number;
}

export interface IGenreListingResponse {
    rows: IListGenre[];
    rowsCount: number;
}

export interface IGenreListingRepository {
    list(): Promise<IGenreListingResponse>;
}

export interface IGenreListing {
    execute(): Promise<IGenreListingResponse>;
}

export class GenreListing implements IGenreListing {
    private repo: IGenreListingRepository;

    public constructor(options: {
        repo: IGenreListingRepository;
    }) {
        this.repo = options.repo;
    }

    public async execute(): Promise<IGenreListingResponse> {
        return await this.repo.list();
    }
}
