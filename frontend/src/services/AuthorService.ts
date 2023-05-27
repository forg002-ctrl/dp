import axios from "axios";

export interface ICreateAuthorData {
    firstname: string;
    lastname: string;
    birthdate: string;
    info: string;
}

export class AuthorService {
    static async getAuthors() {
        let response = await axios.get('http://localhost:3001/authors');

        return response;
    }

    static async createAuthor(data: ICreateAuthorData) {
        let response = await axios.post('http://localhost:3001/author', data);

        return response;
    }
}