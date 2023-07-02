import React, {ChangeEvent, FormEvent, useState} from "react";
import {Loader} from "../common/Loader"
import {Platform} from "../../types/index"
import {DatalistPlatform} from "./DatalistPlatform"

interface AddStreamerProps {
    addStreamer: () => void;
}

interface FormValues {
    username: string;
    platform: Platform | '';
    description?: string;
}

interface SelectOption {
    value: Platform;
    label: Platform;
}


export const StreamerForm = ({addStreamer}: AddStreamerProps) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [formData, setFormData] = useState<FormValues>({username: "", description: "", platform: ""});
    const [file, setFile] = useState<File>()


    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setFormData((prevState) => ({...prevState, [name]: value}));
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        const multipartFormData = new FormData();
        multipartFormData.append("username", formData.username);
        multipartFormData.append("description", formData.description || '');
        multipartFormData.append("platform", formData.platform);
        if (file) {
            multipartFormData.append("image", file);
        }

        const res = await fetch("http://localhost:3000/streamers/", {
            method: "POST",
            body: multipartFormData,
        });
        addStreamer()
        setIsLoading(false)
    }

    const handlePlatformChange = (selectedOption: SelectOption | null) => {
        if (selectedOption) {
            setFormData((prevState) => ({...prevState, platform: selectedOption.value}));
        }
    }

    return (
        <>
            <div className="mx-auto py-6 px-6 lg:px-8 text-left">
                {isLoading && <div className="text-center">
                    <h3 className="mb-4 text-xl font-medium text-gray-900">
                        Creating new streamer, please wait!
                    </h3>
                    <Loader/>
                </div>}
                {!isLoading &&
                    <form
                        className="space-y-6"
                        onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="username"
                                   className="block mb-2 text-sm font-medium text-gray-900">
                                Write down streamer username:
                            </label>
                            <input
                                type="text"
                                name="username"
                                id="username"
                                value={formData.username}
                                onChange={handleChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                placeholder="Asmongold"
                                required
                            />

                        </div>
                        <div>
                            <label htmlFor="platform"
                                   className="block mb-2 text-sm font-medium text-gray-900">
                                Choose streamer main platform
                            </label>
                            <DatalistPlatform onChange={handlePlatformChange}/>
                        </div>
                        <div>
                            <label htmlFor="description"
                                   className="block mb-2 text-sm font-medium text-gray-900">
                                Streamer description
                            </label>
                            <input
                                type="textarea"
                                name="description"
                                id="description"
                                onChange={handleChange}
                                placeholder="Best streamer ever!"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                required/>
                        </div>
                        <div>
                            <label htmlFor="image"
                                   className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                Drag and drop, or click to upload streamers photo!
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                name="image"
                                id="image"
                                onChange={handleFileChange}
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                            Add new streamer!
                        </button>
                    </form>
                }
            </div>
        </>
    );
};