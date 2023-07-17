export interface IAuthorCreationData {
    firstname: string;
    lastname: string;
    birthdate: string;
    info: string;
}

export interface IAuthorCreationRepoData {
    firstname: string;
    lastname: string;
    birthdate: string;
    info: string;
}

export interface IAuthorCreationResponse {
    id_author: string;
}

export interface IAuthorCreationRepository {
    create(data: IAuthorCreationRepoData): Promise<IAuthorCreationResponse>;
}

export interface IAuthorCreation {
    execute(data: IAuthorCreationData): Promise<IAuthorCreationResponse>;
}

export class AuthorCreation implements IAuthorCreation {
    private repo: IAuthorCreationRepository;

    public constructor(options: {
        repo: IAuthorCreationRepository;
    }) {
        this.repo = options.repo;
    }

    public async execute(data: IAuthorCreationData): Promise<IAuthorCreationResponse> {
        this.validateData(data);

        return await this.repo.create({
            firstname: data.firstname,
            lastname: data.lastname,
            birthdate: data.birthdate,
            info: data.info,
        });
    }

    private validateData(data: IAuthorCreationData): void {
        if (!data.firstname) {
            throw new Error('Firstname Missing');
        }
        if (!data.lastname) {
            throw new Error('Lastname Missing');
        }
        if (!data.birthdate) {
            throw new Error('Birthdate Missing');
        }
        //TODO: Date validation
    }
}
