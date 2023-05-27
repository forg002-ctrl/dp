import { IGenreGetting } from '@src/modules/genre/GenreGetting';
import { IAuthorGetting } from '@src/modules/author/AuthorGetting';
import { NotFoundError } from '@src/lib/errors/types/NotFoundError';

export interface IBookCreationData {
    id_genre: string;
    id_author: string;
    title: string;
    price: number;
    info: string;
    imageName: string;
}

export interface IBookCreationRepoData {
    id_genre: string;
    id_author: string;
    title: string;
    price: number;
    info: string;
    imageName: string;
}

export interface IBookCreationResponse {
    id_book: string;
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

    public constructor(options: {
        repo: IBookCreationRepository;
        genreGetting: IGenreGetting;
        authorGetting: IAuthorGetting;
    }) {
        this.repo = options.repo;
        this.genreGetting = options.genreGetting;
        this.authorGetting = options.authorGetting;
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

        return await this.repo.create({
            id_genre: data.id_genre,
            id_author: data.id_author,
            title: data.title,
            price: data.price,
            info: data.info,
            imageName: data.imageName,
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
        if (!data.imageName) {
            throw new Error('Image Missing');
        }
    }
}
