import { useState } from 'react';
import { useFetch } from 'hooks/useFetch';

import { IListBook as IBook, IResponseBody } from 'ext/shared/routes/books/GetRouteDescription';

import { BookItem } from 'pages/books/BookItem';
import { Loader } from 'components/UI/loader/Loader';

export const BookList = () => {
    const [query, setQuery] = useState('');
    const [search, setSearch] = useState('');
    
    const { data, error } = useFetch<IResponseBody>(`http://localhost:3001/books?search=${search}`);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };
    const handleSearch = () => {
        setSearch(query);
        setQuery('');
    };

    if (error) {
        return <p>Error</p>
    }
    return(
        <div className="p-8">
            <div className="flex justify-center">
                <div className="flex relative h-[60px] max-w-[700px] w-full bg-[#F3F8F2] mb-4 rounded-lg shadow-lg shadow-grey-400">
                    <input className="h-full w-3/4 text-base pr-[155px] pl-[65px] bg-transparent focuse-visible: outline-none" type="text" placeholder="Search here..." value={query} onChange={(event) => setQuery(event.target.value)} onKeyDown={handleKeyDown}/>
                    <button className="absolute top-1/2 translate-y-[-50%] right-5 text-base px-[30px] py-3 bg-[#39A2AE] cursor-pointer rounded-lg" onClick={handleSearch}>Search</button>
                </div>
            </div>
            {!data ? 
                <Loader />
            :
                <div className="grid grid-flow-row gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {data.rows.map((book: IBook, key: number) =>
                        <BookItem book={book} key={key} />
                    )}
                </div>
            }
        </div>
    );
};