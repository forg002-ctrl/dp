import { Association } from '@src/ext/sdk/backend/storage/postgresql/model/Association';

export const AuthorBookAssociation = new Association({
    type: '1:n',
    mainModelName: 'authors',
    secondaryModelName: 'books',
});
