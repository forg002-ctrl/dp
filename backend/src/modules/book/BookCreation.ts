import { NotFoundError } from '@src/ext/sdk/backend/errors/types/NotFoundError';

import { IGenreGetting } from '@src/modules/genre/GenreGetting';
import { IAuthorGetting } from '@src/modules/author/AuthorGetting';
import { IFileSaving } from '@src/modules/file/FileSaving';

export interface IBookCreationData {
    id_genre: number;
    id_author: number;
    title: string;
    price: number;
    info: string;
    file: Express.Multer.File;
}

export interface IBookCreationRepoData {
    id_genre: number;
    id_author: number;
    title: string;
    price: number;
    info: string;
    uid_file: string;
}

export interface IBookCreationResponse {
    id_book: number;
}

export interface IBookCreationRepository {
    create(data: IBookCreationRepoData): Promise<IBookCreationResponse>;
}

export interface IBookCreation {
    execute(data: IBookCreationData): Promise<IBookCreationResponse>;
}

export class BookCreation implements IBookCreation {
    private repo: IBookCreationRepository;
    private genreGetting: IGenreGetting;
    private authorGetting: IAuthorGetting;
    private fileSaving: IFileSaving;

    public constructor(options: {
        repo: IBookCreationRepository;
        genreGetting: IGenreGetting;
        authorGetting: IAuthorGetting;
        fileSaving: IFileSaving;
    }) {
        this.repo = options.repo;
        this.genreGetting = options.genreGetting;
        this.authorGetting = options.authorGetting;
        this.fileSaving = options.fileSaving;
    }

    public async execute(data: IBookCreationData): Promise<IBookCreationResponse> {
        this.validateData(data);

        let genre = await this.genreGetting.execute({
            id_genre: data.id_genre,
        });
        if (!genre) {
            throw new NotFoundError('Genre Not Found');
        }

        let author = await this.authorGetting.execute({
            id_author: data.id_author,
        });
        if (!author) {
            throw new NotFoundError('Author Not Found');
        }

        let response = await this.fileSaving.execute({
            file: data.file,
        });

        return await this.repo.create({
            id_genre: data.id_genre,
            id_author: data.id_author,
            title: data.title,
            price: data.price,
            info: data.info,
            uid_file: response.uid_file,
        });
    }

    private validateData(data: IBookCreationData): void {
        if (!data.id_author) {
            throw new Error('Author Identifier Missing');
        }
        if (!data.id_genre) {
            throw new Error('Genre Identifier Missing');
        }
        if (!data.title) {
            throw new Error('Title Missing');
        }
        if (!data.price) {
            throw new Error('Price Missing');
        }
        if (!data.info) {
            throw new Error('Info Missing');
        }
        if (!data.file) {
            throw new Error('Image Missing');
        }
    }
}
