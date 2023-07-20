import axios from "axios";
import { useState } from "react";
import { useFetch } from "hooks/useFetch";

import { IResponseBody as IListAuthorsResponse, IListAuthor } from 'ext/shared/services/backend/routes/authors/GetRouteDescription';
import { IResponseBody as IListGenresResponse, IListGenre } from 'ext/shared/services/backend/routes/genres/GetRouteDescription';

import { Loader } from 'components/UI/loader/Loader';
import { Select } from "components/UI/select/Select";
import { ImageLoader } from "components/UI/imageLoader/ImageLoader";


type BookFormData = {
    title: string;
    price: number;
    info: string;
    id_author: string;
    id_genre: string;
    file: File | null;
}

export const BookCreatePage = () => {
    const [formData, setFormData] = useState<BookFormData>({
        title: '',
        price: 0,
        info: '',
        id_author: '',
        id_genre: '',
        file: null,
    });
    const [postError, setPostError] = useState<string>();

    const authorsResponse = useFetch<IListAuthorsResponse>('http://localhost:3001/authors');
    const genresResponse = useFetch<IListGenresResponse>('http://localhost:3001/genres');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: value,
        }));
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setFormData((prevFormData) => ({
                ...prevFormData,
                'file': event.target.files[0],
              }));
        }
    }

    const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        let formDataToSend = new FormData();
        if (!formData.file) {
            throw new Error('File is missing');
        }
        formDataToSend.append('title', formData.title);
        formDataToSend.append('price', formData.price.toString());
        formDataToSend.append('info', formData.info);
        formDataToSend.append('id_author', formData.id_author);
        formDataToSend.append('file', formData.file);
        formDataToSend.append('id_genre', formData.id_genre);

        let response = await axios.post('http://localhost:3001/book', formDataToSend, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });
        if (response.status !== 201) {
            setPostError(response.data);
        }
    };

    if (authorsResponse.error || genresResponse.error) {
        return <p>Error</p>
    }
    if (postError) {
        return <p>Post Error</p>
    }
    return (!authorsResponse.data || !genresResponse.data ?
            <Loader />
        :
            <div className="min-h-screen p-6 flex items-center justify-center">
                <div className="container max-w-screen-lg mx-auto">
                    <form
                        className="bg-white rounded shadow-lg p-4 px-4 md:p-8"
                        onSubmit={handleOnSubmit}
                        encType="multipart/form-data"
                    >
                        <h2 className="flex justify-center text-2xl mb-4">Book Creation Form</h2>
                        <div className="mb-5">
                            <label className="block mb-1" htmlFor="title">Title</label>
                            <input 
                                className="h-10 border mt-1 rounded px-4 w-full bg-[#F3F8F2] focuse-visible: outline-none focus:outline-[#39A2AE] outline-offset-0"
                                value={formData.title} onChange={handleChange} type="text" id="title" name="title" required
                            />
                        </div>
                        <div className="mb-5">
                            <label className="block mb-1" htmlFor="price">Price</label>
                            <input
                                className="h-10 border mt-1 rounded px-4 w-full bg-[#F3F8F2] focuse-visible: outline-none focus:outline-[#39A2AE] outline-offset-0"
                                value={formData.price} onChange={handleChange} type="number" id="price" name="price" required
                            />
                        </div>
                        <div className="mb-5">
                            <label className="block mb-1" htmlFor="info">Information</label>
                            <textarea
                                className="h-36 border mt-1 rounded px-4 w-full bg-[#F3F8F2] focuse-visible: outline-none focus:outline-[#39A2AE] outline-offset-0"
                                value={formData.info} onChange={handleChange} id="info" name="info" required
                            />
                        </div>
                        <div className="mb-5">
                            <label className="block mb-1">Author</label>
                            <Select
                                placeholder="Select Author"
                                name="id_author"
                                options={authorsResponse.data.rows.map((author: IListAuthor) => {
                                    return {
                                        value: author.id_author,
                                        label: `${author.lastname} ${author.firstname}`,
                                    };
                                })}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-5">
                            <label className="block mb-1">Genre</label>
                            <Select
                                placeholder="Select Genre"
                                name="id_genre"
                                options={genresResponse.data.rows.map((genre: IListGenre) => {
                                    return {
                                        value: genre.id_genre,
                                        label: genre.name,
                                    };
                                })}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-5">
                            <label className="block mb-1">Image</label>
                            <ImageLoader 
                                name="file"
                                onImageLoad={handleFileChange}
                            />
                        </div>
                        <button
                            className="w-full py-2 px-4 bg-[#39A2AE] text-white rounded-md hover:bg-[#39a2aed2] focus:outline-none focus:bg-[#39a2aed2]"
                            type="submit"
                            >
                                Create Book
                        </button>
                    </form>
                </div>
            </div>
    );
};