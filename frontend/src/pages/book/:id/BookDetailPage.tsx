import { useParams } from "react-router-dom";
import { useFetch } from "hooks/useFetch";

import { IResponseBody as IBook } from 'ext/shared/routes/book/GetRouteDescription';

import { Loader } from 'components/UI/loader/Loader';

export const BookDetailPage = () => {
    const { id_book } = useParams();

    const { data, error } = useFetch<IBook>(`http://localhost:3001/book/${id_book}`);

    if (error) {
        return <p>Error</p>
    }
    return (!data ?
            <Loader />
        :
            <div className="w-full my-12 flex flex-col justify-center">
                <div className="max-w-[1240px] mx-auto grid sm:grid-cols-2">
                    <div className="w-11/12 border-2 border-[#39A2AE] bg-[#F3F8F2]">
                        <img className="w-3/4 my-8 mx-auto" src={`http://localhost:3002/${data.imageName}`} alt="" />
                    </div>
                    <div className="flex flex-col justify-center">
                        <p className='text-4xl font-bold pb-4'>{data.title}</p>
                        <p className='text-2xl font-bold'>{data.author_fullname}</p>
                        <p className="py-4 text-lg">{data.info}</p>
                        <hr className="my-2 border-[#39A2AE]" />
                        <div className='flex flex-row justify-between py-4'>
                            <p className='text-xl'>Genre: <b>{data.genre_name}</b></p>
                            <p className='text-xl text-red-500'>Price: <b>{data.price} $</b></p>
                        </div>
                    </div>
                </div>
            </div>
    );
};