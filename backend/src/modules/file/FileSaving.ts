import FormData from 'form-data';

import { SDK } from '@src/ext/sdk/backend/index';

export interface IFileSavingData {
    file: Express.Multer.File;
}

export interface IFileSavingResponse {
    uid_file: string;
}

export interface IFileSaving {
    execute(data: IFileSavingData): Promise<IFileSavingResponse>;
}

export class FileSaving implements IFileSaving {
    private fsSrvHost: string;

    public constructor(options: {
        fsSrvHost: string;
    }) {
        this.fsSrvHost = options.fsSrvHost;
    }

    public async execute(data: IFileSavingData): Promise<IFileSavingResponse> {
        let fsRemoteService = await SDK.GetInstance().getRemoteService('fs_srv');
        if (!fsRemoteService) {
            throw new Error('FS_SRV unavailable');
        }

        let formData = new FormData();
        formData.append('file', Buffer.from(data.file.buffer), {
            filename: data.file.originalname,
            contentType: data.file.mimetype,
        });

        let response = await fsRemoteService.post(`/file`, formData, {
            ...formData.getHeaders(),
        });
        if (response.status !== 201) {
            throw new Error('Something went wrong');
        }

        return await response.json<IFileSavingResponse>();
    }
}
