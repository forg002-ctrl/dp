export interface IListBook {
    id_book: string;
    id_author: string;
    id_genre: string;
    author_fullname: string;
    genre_name: string;
    title: string;
    price: number;
    imageName: string;
}

export interface IListBookParams {
    search?: string;
}

export interface IListBookRepositoryParams {
    search: string;
}

export interface IBookListingResponse {
    rows: IListBook[];
    rowsCount: number;
}

export interface IBookListingRepository {
    list(params: IListBookRepositoryParams): Promise<IBookListingResponse>;
}

export interface IBookListing {
    execute(params: IListBookParams): Promise<IBookListingResponse>;
}

export class BookListing implements IBookListing {
    private repo: IBookListingRepository;

    public constructor(options: {
        repo: IBookListingRepository;
    }) {
        this.repo = options.repo;
    }

    public async execute(params: IListBookParams): Promise<IBookListingResponse> {
        return await this.repo.list({
            search: params.search ? params.search : '',
        });
    }
}
