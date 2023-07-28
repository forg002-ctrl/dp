import { Association } from '@src/ext/sdk/backend/storage/postgresql/model/Association';

export const GenreBookAssociation = new Association({
    type: '1:n',
    mainModelName: 'genres',
    secondaryModelName: 'books',
});
