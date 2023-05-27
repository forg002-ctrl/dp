import { Association } from "@src/lib/app/model/Association";

export const AuthorBookAssociation = new Association({
    type: '1:n',
    mainModelName: 'authors',
    secondaryModelName: 'books',
});