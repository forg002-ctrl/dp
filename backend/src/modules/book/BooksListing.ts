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

export interface IListBookParams {
    search?: string;
}

export interface IListBookRepositoryParams {
    search: string;
}

export interface IBooksListingResponse {
    rows: IListBook[];
    rowsCount: number;
}

export interface IBooksListingRepository {
    list(params: IListBookRepositoryParams): Promise<IBooksListingResponse>;
}

export interface IBooksListing {
    execute(params: IListBookParams): Promise<IBooksListingResponse>;
}

export class BooksListing implements IBooksListing {
    private repo: IBooksListingRepository;

    public constructor(options: {
        repo: IBooksListingRepository;
    }) {
        this.repo = options.repo;
    }

    public async execute(params: IListBookParams): Promise<IBooksListingResponse> {
        return await this.repo.list({
            search: params.search ? params.search : '',
        });
    }
}
