import axios from "axios";


export class BookService {
    static async getBooks() {
        let response = await axios.get('http://localhost:3001/books');

        return response;
    }

    static async createBook(formData: FormData): Promise<void> {
        let response = await axios.post('http://localhost:3001/book', formData);
    }
}