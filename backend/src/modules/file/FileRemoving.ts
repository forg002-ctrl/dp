import { SDK } from '@src/ext/sdk/backend/index';

export interface IFileRemovingOptions {
    uid_file: string;
}

export interface IFileRemovingResponse {
    success: boolean;
}

export interface IFileRemoving {
    execute(options: IFileRemovingOptions): Promise<IFileRemovingResponse>;
}

export class FileRemoving implements IFileRemoving {
    private fsSrvHost: string;

    public constructor(options: {
        fsSrvHost: string;
    }) {
        this.fsSrvHost = options.fsSrvHost;
    }

    public async execute(options: IFileRemovingOptions): Promise<IFileRemovingResponse> {
        let fsRemoteService = await SDK.GetInstance().getRemoteService('fs_srv');
        if (!fsRemoteService) {
            throw new Error('FS_SRV unavailable');
        }

        let response = await fsRemoteService.delete(`/file/${options.uid_file}`);
        if (response.status !== 200) {
            throw new Error('Something went wrong');
        }

        return await response.json<IFileRemovingResponse>();
    }
}
