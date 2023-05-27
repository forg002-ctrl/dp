import { Cart } from "@/lib/parts/Cart";
import { PaymentService } from "./PaymentService";

export class OrderService {
    placeOrder(cart: Cart, paymentService: PaymentService): boolean {
        const total = cart.getTotalPrice();
        const paymentSuccessful = paymentService.processPayment(total);

        if (paymentSuccessful) {
            console.log(`Order placed for books with total price ${total}`);
            cart.getItems().forEach(book => console.log(` - ${book.title} by ${book.author_fullname}`));
        } else {
            console.log(`Failed to place order. Payment was not successful.`);
        }

        return paymentSuccessful;
    }
}