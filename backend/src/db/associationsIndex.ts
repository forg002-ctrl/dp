import { Association } from '@src/lib/app/model/Association';

import { AuthorBookAssociation } from '@src/db/associations/authorBookAssociation';
import { GenreBookAssociation } from '@src/db/associations/genreBookAssociation';

export const appAssociations: Association[] = [
    AuthorBookAssociation,
    GenreBookAssociation,
];