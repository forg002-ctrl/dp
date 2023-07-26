import { IBooksRemovingByGenre } from '@src/modules/book/BooksRemovingByGenre';
import { IGenreGetting } from '@src/modules/genre/GenreGetting';

export interface IGenreRemovingOptions {
    id_genre: string;
}

export interface IGenreRemovingResponse {
    removedBooks: number;
}

export interface IGenreRemovingRepository {
    remove(options: IGenreRemovingOptions): Promise<void>;
}

export interface IGenreRemoving {
    execute(options: IGenreRemovingOptions): Promise<IGenreRemovingResponse>;
}

export class GenreRemoving implements IGenreRemoving {
    private repo: IGenreRemovingRepository;
    private genreGetting: IGenreGetting;
    private booksRemovingByGenre: IBooksRemovingByGenre;

    public constructor(options: {
        repo: IGenreRemovingRepository;
        genreGetting: IGenreGetting;
        booksRemovingByGenre: IBooksRemovingByGenre;
    }) {
        this.repo = options.repo;
        this.genreGetting = options.genreGetting;
        this.booksRemovingByGenre = options.booksRemovingByGenre;
    }

    public async execute(options: IGenreRemovingOptions): Promise<IGenreRemovingResponse> {
        this.validateOptions(options);

        // CHECK IF GENRE EXISTS
        let genre = await this.genreGetting.execute({
            id_genre: options.id_genre,
        });

        let response = await this.booksRemovingByGenre.execute({
            id_genre: genre.id_genre,
        });

        await this.repo.remove({
            id_genre: genre.id_genre,
        });

        return {
            removedBooks: response.removedBooks,
        };
    }

    private validateOptions(options: IGenreRemovingOptions): void {
        if (!options.id_genre) {
            throw new Error('Genre Indetifier Missing');
        }
    }
}
