import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { BookService, IGetBook } from "../../services/BookService";

import { Loader } from '../../components/UI/loader/Loader';

import './BookDetailPage.css'

export const BookDetailPage: FC = () => {
    const { id_book } = useParams();
    const [book, setBook] = useState<IGetBook | null>(null);
    
    useEffect(() => {
        const fetchData = async () => {
            if (!id_book) {
                throw new Error();
            }
            let response = await BookService.getBook(id_book);
          
            setBook(response);
        };
        
        fetchData();
    }, [id_book]);

    return (!book ?
            <Loader />
        :
            <div className="book-detail-container">
                <div className="row">
                    <div className="col-2">
                        <img src={`http://localhost:3002/${book.imageName}`} alt="" />
                    </div>
                    <div className="col-2 book-detail-card">
                        <div className="book-detail-card-main">
                            <div className='book-detail-title'><b>{book.title}</b></div>
                            <div className='book-detail-author'><b>{book.author_fullname}</b></div>
                        </div>
                        <div className="book-detail-info">{book.info}</div>
                        <div className='book-detail-card-footer'>
                            <div className='book-detail-genre'>Genre: <b> {book.genre_name}</b></div>
                            <div className='book-detail-price'>Price: <b> {book.price} $</b></div>
                        </div>
                    </div>
                </div>
            </div>
    );
};