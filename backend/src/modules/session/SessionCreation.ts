import { uuid } from 'uuidv4';

export interface ISessionCreationData {
    id_user: number;
}

export interface ISessionCreationRepositoryData {
    id_session: string;
    id_user: number;
}

export interface ISessionCreationResponse {
    id_session: string;
}

export interface ISessionCreation {
    execute(data: ISessionCreationData): Promise<ISessionCreationResponse>;
}

export interface ISessionCreationRepository {
    create(data: ISessionCreationRepositoryData): Promise<ISessionCreationResponse>;
}

export class SessionCreation implements ISessionCreation {
    private repo: ISessionCreationRepository;

    public constructor(options: {
        repo: ISessionCreationRepository;
    }) {
        this.repo = options.repo;
    }

    public async execute(data: ISessionCreationData): Promise<ISessionCreationResponse> {
        this.validateData(data);

        return await this.repo.create({
            id_session: uuid(),
            id_user: data.id_user,
        });
    }

    private validateData(data: ISessionCreationData): void {
        if (!data.id_user) {
            throw new Error('User Identifier missing');
        }
    }
}
