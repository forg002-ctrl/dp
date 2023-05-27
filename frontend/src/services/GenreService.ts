import axios from "axios";

export interface ICreateGenreData {
    name: string;
}

export class GenreService {
    static async getGenres() {
        let response = await axios.get('http://localhost:3001/genres');

        return response;
    }

    static async createGenre(data: ICreateGenreData) {
        let response = await axios.post('http://localhost:3001/genre', data);

        return response;
    }
}