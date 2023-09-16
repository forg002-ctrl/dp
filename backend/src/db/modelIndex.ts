import { Model } from '@src/ext/sdk/backend/storage/postgresql/parts/Model';

import { UserModel } from '@src/db/models/userModel';
import { SessionModel } from '@src/db/models/sessionModel';
import { GenreModel } from '@src/db/models/genreModel';
import { AuthorModel } from '@src/db/models/authorModel';
import { BookModel } from '@src/db/models/bookModel';

export const appModels: Model[] = [
    UserModel,
    SessionModel,
    GenreModel,
    AuthorModel,
    BookModel,
];
