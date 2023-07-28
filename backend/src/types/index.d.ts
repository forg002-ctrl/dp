export {};

declare global {
    namespace NodeJS {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        interface Global {
            testMode: boolean;
        }
    }
}
