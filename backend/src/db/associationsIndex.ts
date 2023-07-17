import { Association } from '@src/ext/sdk/backend/storage/postgresql/model/Association';

import { AuthorBookAssociation } from '@src/db/associations/authorBookAssociation';
import { GenreBookAssociation } from '@src/db/associations/genreBookAssociation';

export const appAssociations: Association[] = [
    AuthorBookAssociation,
    GenreBookAssociation,
];
