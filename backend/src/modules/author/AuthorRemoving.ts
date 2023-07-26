import { IBooksRemovingByAuthor } from '@src/modules/book/BooksRemovingByAuthor';
import { IAuthorGetting } from '@src/modules/author/AuthorGetting';

export interface IAuthorRemovingOptions {
    id_author: string;
}

export interface IAuthorRemovingResponse {
    removedBooks: number;
}

export interface IAuthorRemovingRepository {
    remove(options: IAuthorRemovingOptions): Promise<void>;
}

export interface IAuthorRemoving {
    execute(options: IAuthorRemovingOptions): Promise<IAuthorRemovingResponse>;
}

export class AuthorRemoving implements IAuthorRemoving {
    private repo: IAuthorRemovingRepository;
    private authorGetting: IAuthorGetting;
    private booksRemovingByAuthor: IBooksRemovingByAuthor;

    public constructor(options: {
        repo: IAuthorRemovingRepository;
        authorGetting: IAuthorGetting;
        booksRemovingByAuthor: IBooksRemovingByAuthor;
    }) {
        this.repo = options.repo;
        this.authorGetting = options.authorGetting;
        this.booksRemovingByAuthor = options.booksRemovingByAuthor;
    }

    public async execute(options: IAuthorRemovingOptions): Promise<IAuthorRemovingResponse> {
        this.validateOptions(options);

        // CHECK IF AUTHOR EXISTS
        let author = await this.authorGetting.execute({
            id_author: options.id_author,
        });

        let response = await this.booksRemovingByAuthor.execute({
            id_author: author.id_author,
        });

        await this.repo.remove({
            id_author: author.id_author,
        });

        return {
            removedBooks: response.removedBooks,
        };
    }

    private validateOptions(options: IAuthorRemovingOptions): void {
        if (!options.id_author) {
            throw new Error('Author Indetifier Missing');
        }
    }
}
