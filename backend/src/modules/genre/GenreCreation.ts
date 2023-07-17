export interface IGenreCreationData {
    name: string;
}

export interface IGenreCreationResponse {
    id_genre: string;
}

export interface IGenreCreationRepoData {
    name: string;
}

export interface IGenreCreationRepository {
    create(data: IGenreCreationRepoData): Promise<IGenreCreationResponse>;
}

export interface IGenreCreation {
    execute(data: IGenreCreationData): Promise<IGenreCreationResponse>;
}

export class GenreCreation implements IGenreCreation {
    private repo: IGenreCreationRepository;

    public constructor(options: {
        repo: IGenreCreationRepository;
    }) {
        this.repo = options.repo;
    }

    public async execute(data: IGenreCreationData): Promise<IGenreCreationResponse> {
        // TODO: add unique check
        this.validateData(data);

        return await this.repo.create({
            name: data.name,
        });
    }

    private validateData(data: IGenreCreationData): void {
        if (!data.name) {
            throw new Error('Genre name is missing');
        }
    }
}
