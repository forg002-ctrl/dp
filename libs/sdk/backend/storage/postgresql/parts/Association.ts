import { PostgresqlClient } from '../PostgresqlClient';

export type ASSOCIATION_TYPES = '1:1' | '1:n' | 'n:m';

interface IManyToManyKeys {
    mainModelKey: string;
    secondaryModelKey: string;
}

export interface IAssociation {
    type: ASSOCIATION_TYPES;
    mainModelName: string;
    secondaryModelName: string;
}

export class Association implements IAssociation {
    public type: ASSOCIATION_TYPES;
    public mainModelName: string;
    public secondaryModelName: string;

    public constructor(options: IAssociation) {
        this.type = options.type;
        this.mainModelName = options.mainModelName;
        this.secondaryModelName = options.secondaryModelName;
    }

    public registerAssociation(postgresqlClient: PostgresqlClient): void {
        postgresqlClient.registerAssociation({
            type: this.type,
            mainModelName: this.mainModelName,
            secondaryModelName: this.secondaryModelName,
        });
    }
}
