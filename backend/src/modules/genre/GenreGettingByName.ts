export interface IGenreGettingByNameOptions {
    name: string;
}

export interface IGenreGettingByNameResponse {
    id_genre: string;
    name: string;
    booksCount: number;
}

export interface IGenreGettingByNameRepository {
    getByName(options: IGenreGettingByNameOptions): Promise<IGenreGettingByNameResponse | null>;
}

export interface IGenreGettingByName {
    execute(options: IGenreGettingByNameOptions): Promise<IGenreGettingByNameResponse | null>;
}

export class GenreGettingByName implements IGenreGettingByName {
    private repo: IGenreGettingByNameRepository;

    public constructor(options: {
        repo: IGenreGettingByNameRepository;
    }) {
        this.repo = options.repo;
    }

    public async execute(options: IGenreGettingByNameOptions): Promise<IGenreGettingByNameResponse | null> {
        this.validateOptions(options);

        return await this.repo.getByName({
            name: options.name,
        });
    }

    private validateOptions(options: IGenreGettingByNameOptions): void {
        if (!options.name) {
            throw new Error('Genre Name Missing');
        }
    }
}
