import { PostgresqlClient } from '@src/ext/sdk/backend/storage/postgresql/PostgresqlClient';
import { start }  from '@src/test/start';

beforeAll(async (): Promise<void> => {
    await start();
});

afterAll(async (): Promise<void> => {
    let postgresqlClient = PostgresqlClient.GetInstance();
    if (postgresqlClient) {
        await postgresqlClient.closeConnection();
    }
});
