import { IBooksListingByAuthor } from '@src/modules/book/BooksListingByAuthor';
import { IBookRemoving } from '@src/modules/book/BookRemoving';

export interface IBookRemovingByAuthorOptions {
    id_author: string;
}

export interface IBooksRemovingByAuthorResponse {
    removedBooks: number;
}

export interface IBooksRemovingByAuthor {
    execute(options: IBookRemovingByAuthorOptions): Promise<IBooksRemovingByAuthorResponse>;
}

export class BooksRemovingByAuthor implements IBooksRemovingByAuthor {
    private booksListingByAuthor: IBooksListingByAuthor;
    private bookRemoving: IBookRemoving;

    public constructor(options: {
        booksListingByAuthor: IBooksListingByAuthor;
        bookRemoving: IBookRemoving;
    }) {
        this.booksListingByAuthor = options.booksListingByAuthor;
        this.bookRemoving = options.bookRemoving;
    }

    public async execute(options: IBookRemovingByAuthorOptions): Promise<IBooksRemovingByAuthorResponse> {
        this.validateOptions(options);

        let booksResponse = await this.booksListingByAuthor.execute({
            id_author: options.id_author,
        });

        for (let book of booksResponse.rows) {
            let response = await this.bookRemoving.execute({
                id_book: book.id_book,
            });

            if (!response || !response.success) {
                throw new Error('Something went wrong in BooksRemovingByAuthor');
            }
        }

        return {
            removedBooks: booksResponse.rowsCount,
        };
    }

    private validateOptions(options: IBookRemovingByAuthorOptions): void {
        if (!options.id_author) {
            throw new Error('Author Indetifier Missing');
        }
    }
}
