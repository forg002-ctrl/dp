import axios, { toFormData } from 'axios';
import FormData from 'form-data';

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
        let formData = new FormData();
        console.log(data.file.buffer);
        formData.append('file', Buffer.from(data.file.buffer), {
            filename: data.file.originalname,
            contentType: data.file.mimetype,
        });

        let response = await axios.post<IFileSavingResponse>(`http://fs_srv:3003/file`, formData, {
            headers: {
                ...formData.getHeaders(),
            },
        });
        if (response.status !== 201) {
            throw new Error('Something went wrong');
        }
        
        return response.data;
    }
}