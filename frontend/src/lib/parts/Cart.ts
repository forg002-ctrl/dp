import { IBook } from "./interfaces/IBook";

export class Cart {
    private items: IBook[];

    constructor() {
        this.items = [];
    }

    addItem(book: IBook): void {
        this.items.push(book);
    }

    removeItem(book: IBook): void {
        this.items = this.items.filter(item => item !== book);
    }

    getItems(): IBook[] {
        return this.items;
    }

    getTotalPrice(): number {
        return this.items.reduce((total, book) => total + book.price, 0);
    }

    clear(): void {
        this.items = [];
    }
}