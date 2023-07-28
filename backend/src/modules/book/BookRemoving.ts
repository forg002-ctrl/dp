import { IBookGetting } from '@src/modules/book/BookGetting';
import { IFileRemoving } from '@src/modules/file/FileRemoving';

export interface IBookRemovingOptions {
    id_book: string;
}

export interface IBookRemovingResponse {
    success: boolean;
}

export interface IBookRemovingRepository {
    remove(options: IBookRemovingOptions): Promise<void>;
}

export interface IBookRemoving {
    execute(options: IBookRemovingOptions): Promise<IBookRemovingResponse>;
}

export class BookRemoving implements IBookRemoving {
    private repo: IBookRemovingRepository;
    private bookGetting: IBookGetting;
    private fileRemoving: IFileRemoving;

    public constructor(options: {
        repo: IBookRemovingRepository;
        bookGetting: IBookGetting;
        fileRemoving: IFileRemoving;
    }) {
        this.repo = options.repo;
        this.bookGetting = options.bookGetting;
        this.fileRemoving = options.fileRemoving;
    }

    public async execute(options: IBookRemovingOptions): Promise<IBookRemovingResponse> {
        this.validateOptions(options);

        let bookToRemove = await this.bookGetting.execute({
            id_book: options.id_book,
        });

        await this.repo.remove({
            id_book: bookToRemove.id_book,
        });

        let response = await this.fileRemoving.execute({
            uid_file: bookToRemove.uid_file,
        });

        return {
            success: response.success,
        };
    }

    private validateOptions(options: IBookRemovingOptions): void {
        if (!options.id_book) {
            throw new Error('Book Indetifier Missing');
        }
    }
}
