import { FC } from 'react';

import { IBook } from '@/lib/parts/interfaces/IBook';

import './BookItem.css'

type BookItemProps = {
    book: IBook;
}

export const BookItem: FC<BookItemProps> = ({book}) => {
    return (
    <div className='book-item-card'>
        <div className='book-item-card-image'>
            <img src={book.imageName} alt="" />
        </div>
        <hr />
        <div className="book-item-card-main">
            <div className='book-item-title'><b>{book.title}</b></div>
            <div className='book-item-author'><b>{book.author_fullname}</b></div>
        </div>
        <div className='book-item-card-footer'>
            <div className='book-item-genre'>Genre: <b> {book.genre_name}</b></div>
            <div className='book-item-price'>Price: <b> {book.price} $</b></div>
        </div>
        <br/>
    </div>)
};