import axios from "axios";
import { useState } from "react";

import { Datepicker } from "components/UI/datepicker/Datepicker";

type AuthorFormData = {
    firstname: string;
    lastname: string;
    info: string;
    birthdate: string;
}

export const AuthorCreatePage = () => {
    const [formData, setFormData] = useState<AuthorFormData>({
        firstname: '',
        lastname: '',
        birthdate: '',
        info: '',
    });
    const [postError, setPostError] = useState<string>();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: value,
        }));
    };

    const handleDateChange = (date: string) => {
        setFormData((prevFormData) => ({
          ...prevFormData,
          'birthdate': date,
        }));
    };

    const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        let response = await axios.post('http://localhost:3001/author', formData);
        if (response.status !== 201) {
            setPostError(response.data);
        } else {
            clearForm();
        }
    };


    let clearDatePickerState: () => void = null;
    const assignClearDatePickerState = (childClearStateFunc: () => void) => {
        clearDatePickerState = childClearStateFunc;
    }
    const clearForm = () => {
        setFormData({
            firstname: '',
            lastname: '',
            birthdate: '',
            info: '',
        });
        clearDatePickerState();
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
                        <h2 className="flex justify-center text-2xl mb-4">Author Creation Form</h2>
                        <div className="mb-5">
                            <label className="block mb-1" htmlFor="firstname">Firstname</label>
                            <input 
                                className="h-10 border mt-1 rounded px-4 w-full bg-[#F3F8F2] focuse-visible: outline-none focus:outline-[#39A2AE] outline-offset-0"
                                value={formData.firstname} onChange={handleChange} type="text" id="firstname" name="firstname" required
                            />
                        </div>
                        <div className="mb-5">
                            <label className="block mb-1" htmlFor="lastname">Lastname</label>
                            <input
                                className="h-10 border mt-1 rounded px-4 w-full bg-[#F3F8F2] focuse-visible: outline-none focus:outline-[#39A2AE] outline-offset-0"
                                value={formData.lastname} onChange={handleChange} type="text" id="lastname" name="lastname" required
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
                            <label className="block mb-1">Birthdate</label>
                            <Datepicker
                                onDatePick={handleDateChange}
                                passClearStateFunc={assignClearDatePickerState}
                            />
                        </div>
                        <button
                            className="w-full py-2 px-4 bg-[#39A2AE] text-white rounded-md hover:bg-[#39a2aed2] focus:outline-none focus:bg-[#39a2aed2]"
                            type="submit"
                            >
                                Create Author
                        </button>
                    </form>
                </div>
            </div>
    );
};