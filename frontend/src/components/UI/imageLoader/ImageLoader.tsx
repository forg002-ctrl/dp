import { ChangeEvent, useState } from 'react';

type ImageLoaderProps = {
    name: string;
    onImageLoad: (event: ChangeEvent<HTMLInputElement>) => void;
    passClearStateFunc: (childClearStateFunc: () => void) => void;
};

export const ImageLoader = (props: ImageLoaderProps) => {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                const imageUrl = reader.result as string;
                setPreviewUrl(imageUrl);
                props.onImageLoad(event);
            };
            reader.readAsDataURL(file);
        }
    };

    const clearState = () => {
        setPreviewUrl(null);
    };
    props.passClearStateFunc(clearState);

    return (
        <>
            <label htmlFor="image-upload" className="flex flex-row">
                {previewUrl ?
                    <img src={previewUrl} alt="Preview" className="w-32 h-32 object-cover rounded-md mb-4 border-[1px] border-[#39A2AE] cursor-pointer" />
                :
                    <div className="w-32 h-32 bg-[#F3F8F2] rounded-md mb-4 border-[1px] border-[#39A2AE] cursor-pointer " />
                }
                <div className="flex items-center pl-6 text-[#39A2AE] font-semibold cursor-pointer">Select Image</div>
            </label>
            <input
                id="image-upload"
                name={props.name}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
            />
        </>
    );
};