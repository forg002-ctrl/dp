import { IBooksListingByGenre } from '@src/modules/book/BooksListingByGenre';
import { IBookRemoving } from '@src/modules/book/BookRemoving';

export interface IBookRemovingByGenreOptions {
    id_genre: number;
}

export interface IBooksRemovingByGenreResponse {
    removedBooks: number;
}

export interface IBooksRemovingByGenre {
    execute(options: IBookRemovingByGenreOptions): Promise<IBooksRemovingByGenreResponse>;
}

export class BooksRemovingByGenre implements IBooksRemovingByGenre {
    private booksListingByGenre: IBooksListingByGenre;
    private bookRemoving: IBookRemoving;

    public constructor(options: {
        booksListingByGenre: IBooksListingByGenre;
        bookRemoving: IBookRemoving;
    }) {
        this.booksListingByGenre = options.booksListingByGenre;
        this.bookRemoving = options.bookRemoving;
    }

    public async execute(options: IBookRemovingByGenreOptions): Promise<IBooksRemovingByGenreResponse> {
        this.validateOptions(options);

        let booksResponse = await this.booksListingByGenre.execute({
            id_genre: options.id_genre,
        });
        for (let book of booksResponse.rows) {
            let response = await this.bookRemoving.execute({
                id_book: book.id_book,
            });

            if (!response || !response.success) {
                throw new Error('Something went wrong in BooksRemovingByGenre');
            }
        }

        return {
            removedBooks: booksResponse.rowsCount,
        };
    }

    private validateOptions(options: IBookRemovingByGenreOptions): void {
        if (!options.id_genre) {
            throw new Error('Genre Indetifier Missing');
        }
    }
}
