import NodeEnvironment from 'jest-environment-node';

export default class CustomEnvironment extends NodeEnvironment {
    public async setup(): Promise<void> {
        await super.setup();

        this.global.isInTestMode = true;
    }
}
