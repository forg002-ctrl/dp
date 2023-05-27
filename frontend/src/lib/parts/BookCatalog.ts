import { IBook } from "./interfaces/IBook";

export class BookCatalog {
    private books: IBook[];

    constructor(books: IBook[]) {
        this.books = books;
    }

    getBooks(): IBook[] {
        return this.books;
    }

    findBookById(id: string): IBook | undefined {
        return this.books.find(book => book.id_book === id);
    }
}