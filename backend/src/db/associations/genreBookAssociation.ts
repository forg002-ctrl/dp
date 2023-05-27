import { Association } from "@src/lib/app/model/Association";

export const GenreBookAssociation = new Association({
    type: '1:n',
    mainModelName: 'genres',
    secondaryModelName: 'books',
});