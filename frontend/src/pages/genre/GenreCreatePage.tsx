import axios from "axios";
import { useState } from "react";

type GenreFormData = {
    name: string;
}

export const GenreCreatePage = () => {
    const [formData, setFormData] = useState<GenreFormData>({
        name: '',
    });
    const [postError, setPostError] = useState<string>();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: value,
        }));
    };

    const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        let response = await axios.post('http://localhost:3001/genre', formData);
        if (response.status !== 201) {
            setPostError(response.data);
        } else {
            clearForm();
        }
    };

    const clearForm = () => {
        setFormData({
            name: '',
        });
    };
    
    if (postError) {
        return <p>Post Error</p>
    }
    return (
        <div className="min-h-screen p-6 flex items-center justify-center">
            <div className="container max-w-screen-lg mx-auto">
                <form
                    className="bg-white rounded shadow-lg p-4 px-4 md:p-8"
                    onSubmit={handleOnSubmit}
                    encType="multipart/form-data"
                >
                    <h2 className="flex justify-center text-2xl mb-4">Genre Creation Form</h2>
                    <div className="mb-5">
                        <label className="block mb-1" htmlFor="name">Name</label>
                        <input 
                            className="h-10 border mt-1 rounded px-4 w-full bg-[#F3F8F2] focuse-visible: outline-none focus:outline-[#39A2AE] outline-offset-0"
                            value={formData.name} onChange={handleChange} type="text" id="name" name="name" required
                        />
                    </div>
                    <button
                        className="w-full py-2 px-4 bg-[#39A2AE] text-white rounded-md hover:bg-[#39a2aed2] focus:outline-none focus:bg-[#39a2aed2]"
                        type="submit"
                        >
                            Create Genre
                    </button>
                </form>
            </div>
        </div>
    );
};