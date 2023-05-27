export interface IListAuthor {
    id_author: string;
    firstname: string;
    lastname: string;
    booksCount: number;
}

export interface IAuthorListingResponse {
    rows: IListAuthor[];
    rowsCount: number;
}

export interface IAuthorListingRepository {
    list(): Promise<IAuthorListingResponse>;
}

export interface IAuthorListing {
    execute(): Promise<IAuthorListingResponse>;
}

export class AuthorListing implements IAuthorListing {
    private repo: IAuthorListingRepository;

    public constructor(options: {
        repo: IAuthorListingRepository;
    }) {
        this.repo = options.repo;
    }

    public async execute(): Promise<IAuthorListingResponse> {
        return await this.repo.list();
    }
}
