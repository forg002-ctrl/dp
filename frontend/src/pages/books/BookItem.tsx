import { useNavigate } from 'react-router-dom';

import { IListBook as IBook } from 'ext/shared/routes/books/GetRouteDescription';

type BookItemProps = {
    book: IBook;
}

export const BookItem = (props: BookItemProps) => {
    const navigate = useNavigate();

    const handelRedirectToDetailPage = (id_book: string) => {
        navigate(`/book/${id_book}`);
    }

    return (
        <div className='rounded shadow-lg shadow-gray-400 bg-[#F3F8F2] duration-300 hover:-translate-y-1' onClick={() => handelRedirectToDetailPage(props.book.id_book)}>
            <figure>
                <img className="object-cover h-64 mx-auto" src={props.book.imageName} alt="" />
                <hr className='border-2 border-[#39A2AE]' />
                <figcaption className='p-4'>
                    <p className='text-xl font-bold leading-relaxed'>{props.book.title}</p>
                    <p className='font-bold'>{props.book.author_fullname}</p>
                    <div className='mt-4 flex flex-row justify-between'>
                        <p>Genre: <b>{props.book.genre_name}</b></p>
                        <p className='text-red-500'>Price: <b>{props.book.price} $</b></p>
                    </div>
                </figcaption>
            </figure>
        </div>
    )
};