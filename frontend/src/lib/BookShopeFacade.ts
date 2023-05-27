import { OrderService } from "./../services/OrderService";
import { PaymentService } from "./../services/PaymentService";
import { BookCatalog } from "./parts/BookCatalog";
import { Cart } from "./parts/Cart";
import { IBook } from "./parts/interfaces/IBook";


export class BookShopFacade {
    private bookCatalog: BookCatalog;
    private cart: Cart;
    private paymentService: PaymentService;
    private orderService: OrderService;

    constructor(books: IBook[]) {
        this.bookCatalog = new BookCatalog(books);
        this.cart = new Cart();
        this.paymentService = new PaymentService();
        this.orderService = new OrderService();
    }

    public getBooks(): IBook[] {
        return this.bookCatalog.getBooks();
    }

    public addToCart(bookId: string): void {
        const book = this.bookCatalog.findBookById(bookId);

        if (book) {
            this.cart.addItem(book);
            console.log(`Added ${book.title} by ${book.author_fullname} to cart.`);
        } else {
            console.log(`Could not find book with ID ${bookId}.`);
        }
    }

    public removeFromCart(bookId: string): void {
        const book = this.bookCatalog.findBookById(bookId);

        if (book) {
            this.cart.removeItem(book);
            console.log(`Removed ${book.title} by ${book.author_fullname} from cart.`);
        } else {
            console.log(`Could not find book with ID ${bookId}.`);
        }
    }

    public viewCart(): void {
        const items = this.cart.getItems();
        console.log(`Cart contains ${items.length} items:`);

        items.forEach(book => console.log(` - ${book.title} by ${book.author_fullname} ($${book.price.toFixed(2)})`)); console.log(`Total price: $${this.cart.getTotalPrice().toFixed(2)}`);
    }

    public placeOrder(): boolean {
        let response = this.orderService.placeOrder(this.cart, this.paymentService);
        this.cart.clear();

        return response;
    }
}
