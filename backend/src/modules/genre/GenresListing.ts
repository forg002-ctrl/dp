export interface IListGenre {
    id_genre: string;
    name: string;
    booksCount: number;
}

export interface IListGenreParams {
    search?: string;
}

export interface IListGenreRepositoryParams {
    search: string;
}

export interface IGenresListingResponse {
    rows: IListGenre[];
    rowsCount: number;
}

export interface IGenresListingRepository {
    list(params: IListGenreRepositoryParams): Promise<IGenresListingResponse>;
}

export interface IGenresListing {
    execute(params: IListGenreParams): Promise<IGenresListingResponse>;
}

export class GenresListing implements IGenresListing {
    private repo: IGenresListingRepository;

    public constructor(options: {
        repo: IGenresListingRepository;
    }) {
        this.repo = options.repo;
    }

    public async execute(params: IListGenreParams): Promise<IGenresListingResponse> {
        return await this.repo.list({
            search: params.search ? params.search : '',
        });
    }
}
