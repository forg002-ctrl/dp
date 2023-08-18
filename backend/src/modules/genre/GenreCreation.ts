import { UserInputError } from '@src/ext/sdk/backend/errors/types/UserInputError';
import { IGenreGettingByName } from '@src/modules/genre/GenreGettingByName';

export interface IGenreCreationData {
    name: string;
}

export interface IGenreCreationResponse {
    id_genre: number;
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
    private genreGettingByName: IGenreGettingByName

    public constructor(options: {
        repo: IGenreCreationRepository;
        genreGettingByName: IGenreGettingByName;
    }) {
        this.repo = options.repo;
        this.genreGettingByName = options.genreGettingByName;
    }

    public async execute(data: IGenreCreationData): Promise<IGenreCreationResponse> {
        this.validateData(data);

        let response = await this.genreGettingByName.execute({
            name: data.name,
        });
        if (response) {
            throw new UserInputError('Genre with such name already exists');
        }

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
