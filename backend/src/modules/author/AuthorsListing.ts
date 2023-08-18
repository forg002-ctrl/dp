export interface IListAuthor {
    id_author: number;
    firstname: string;
    lastname: string;
    booksCount: number;
}

export interface IAuthorsListingResponse {
    rows: IListAuthor[];
    rowsCount: number;
}

export interface IAuthorsListingRepository {
    list(): Promise<IAuthorsListingResponse>;
}

export interface IAuthorsListing {
    execute(): Promise<IAuthorsListingResponse>;
}

export class AuthorsListing implements IAuthorsListing {
    private repo: IAuthorsListingRepository;

    public constructor(options: {
        repo: IAuthorsListingRepository;
    }) {
        this.repo = options.repo;
    }

    public async execute(): Promise<IAuthorsListingResponse> {
        return await this.repo.list();
    }
}
