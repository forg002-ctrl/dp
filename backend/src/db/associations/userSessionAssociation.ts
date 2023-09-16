import { Association } from '@src/ext/sdk/backend/storage/postgresql/parts/Association';

export const SessionUserAssosiation = new Association({
    type: '1:n',
    mainModelName: 'users',
    secondaryModelName: 'sessions',
});
