import { Association } from '@src/ext/sdk/backend/storage/postgresql/parts/Association';

import { AuthorBookAssociation } from '@src/db/associations/authorBookAssociation';
import { GenreBookAssociation } from '@src/db/associations/genreBookAssociation';
import { SessionUserAssosiation } from '@src/db/associations/userSessionAssociation';

export const appAssociations: Association[] = [
    AuthorBookAssociation,
    GenreBookAssociation,
    SessionUserAssosiation,
];
