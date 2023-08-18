export interface IGenreGettingOptions {
    id_genre: number;
}

export interface IGenreGettingResponse {
    id_genre: number;
    name: string;
    booksCount: number;
}

export interface IGenreGettingRepository {
    get(options: IGenreGettingOptions): Promise<IGenreGettingResponse>;
}

export interface IGenreGetting {
    execute(options: IGenreGettingOptions): Promise<IGenreGettingResponse>;
}

export class GenreGetting implements IGenreGetting {
    private repo: IGenreGettingRepository;

    public constructor(options: {
        repo: IGenreGettingRepository;
    }) {
        this.repo = options.repo;
    }

    public async execute(options: IGenreGettingOptions): Promise<IGenreGettingResponse> {
        this.validateOptions(options);

        return await this.repo.get({
            id_genre: options.id_genre,
        });
    }

    private validateOptions(options: IGenreGettingOptions): void {
        if (!options.id_genre) {
            throw new Error('Genre Indetifier Missing');
        }
    }
}
