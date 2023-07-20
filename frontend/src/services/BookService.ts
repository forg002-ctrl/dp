import axios from "axios";

export interface IListBook {
    id_book: string;
    id_author: string;
    id_genre: string;
    author_fullname: string;
    genre_name: string;
    title: string;
    price: number;
    imageName: string;
}

export interface IListReponse {
    rows: IListBook[];
}

export interface IGetBook {
    id_book: string;
    id_author: string;
    id_genre: string;
    author_fullname: string;
    genre_name: string;
    title: string;
    price: number;
    imageName: string;
    info: string;
}

export class BookService {
    static async listBooks(search: string): Promise<IListReponse> {
        let response = await axios.get(`backend/books?search=${search}`);
        if (response.status !== 200) {
            throw new Error('Failed to fetch the data from backend');
        }

        return response.data;
    }

    static async getBook(id_book: string): Promise<IGetBook> {
        let response = await axios.get(`backend/book/${id_book}`);
        if (response.status !== 200) {
            throw new Error('Failed to fetch the data from backend');
        }

        return response.data;
    }

    static async createBook(formData: FormData): Promise<void> {
        let response = await axios.post('http://localhost:3001/book', formData);
    }
}