import axios from 'axios';

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
        let response = await axios.delete<IFileRemovingResponse>(`http://fs_srv:3003/file/${options.uid_file}`);
        if (response.status !== 200) {
            throw new Error('Something went wrong');
        }
        
        return response.data;
    }
}