import { useState, useEffect, FC } from "react";
import { useNavigate } from "react-router-dom";

import { BookItem } from '../books/BookItem';
import { Loader } from "../../components/UI/loader/Loader";

import { IBook } from "@/lib/parts/interfaces/IBook";
import { BookService, IListBook } from '../../services/BookService';

import './BookList.css'

export const BookList: FC = () => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [books, setBooks] = useState<IListBook[]>([]);
    const [query, setQuery] = useState('');
    const [search, setSearch] = useState('');
  
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                let response = await BookService.listBooks(search);
                setBooks(response.rows);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [search])

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    const handleSearch = () => {
        setSearch(query);
        setQuery('');
    };

    const handelRedirectToDetailPage = (id_book: string) => {
        navigate(`/book/${id_book}`);
    }

    return(
        <div className="main-container">
            <div className="search-container">
                <div className="input-box">
                    <i />
                    <input type="text" placeholder="Search here..." value={query} onChange={(event) => setQuery(event.target.value)} onKeyDown={handleKeyDown}/>
                    <button className="search-button" onClick={handleSearch}>Search</button>
                </div>
            </div>
            {loading ? 
                <Loader /> 
            :
                <div className="grid-container">
                    {books.map((book: IBook, key: number) =>
                        <button className="book-button" onClick={() => handelRedirectToDetailPage(book.id_book)}>
                            <BookItem book={book} key={key}/>
                        </button>
                    )}
                </div>
            }
        </div>
    );
};