export interface IListGenre {
    id_genre: string;
    name: string;
    booksCount: number;
}

export interface IGenresListingResponse {
    rows: IListGenre[];
    rowsCount: number;
}

export interface IGenresListingRepository {
    list(): Promise<IGenresListingResponse>;
}

export interface IGenresListing {
    execute(): Promise<IGenresListingResponse>;
}

export class GenresListing implements IGenresListing {
    private repo: IGenresListingRepository;

    public constructor(options: {
        repo: IGenresListingRepository;
    }) {
        this.repo = options.repo;
    }

    public async execute(): Promise<IGenresListingResponse> {
        return await this.repo.list();
    }
}
