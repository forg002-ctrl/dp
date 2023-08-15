/* eslint-disable @typescript-eslint/no-empty-function */
import { PostgresqlClient } from '@src/ext/sdk/backend/storage/postgresql/PostgresqlClient';
import { start }  from '@src/test/start';

const originalConsole = global.console;
global.console = Object.assign({}, originalConsole, {
    log: () => {},
    error: () => {},
    warn: () => {},
});

beforeAll(async (): Promise<void> => {
    await start();
});

afterAll(async (): Promise<void> => {
    let postgresqlClient = PostgresqlClient.GetInstance();
    if (postgresqlClient) {
        await postgresqlClient.closeConnection();
    }
});
