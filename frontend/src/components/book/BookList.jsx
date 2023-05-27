import React, { useState, useEffect } from "react";
import { Grid } from '@material-ui/core';

import Loader from '../UI/loader/Loader';

import BookItem from './BookItem';

import { useFetching } from '../../hooks/useFetching';
import { BookService } from '../../services/BookService';

const BookList = () => {
    const [books, setBooks] = useState([]);
  
    const [fetchBooks, isBooksLoading, bookError] = useFetching(async () => {
        let response = await BookService.getBooks();
  
        setBooks(response.data.rows);
    });
  
    useEffect(() => {
      fetchBooks();
    }, []);
  
    if (!isBooksLoading && (!books || books.length === 0)) {
        return (<h1 style={{ textAlign: 'center' }}>No books</h1>);
    }

    return(
        <div style={{padding: '40px'}}>
            {
                bookError &&
                <h1>Error happend - {bookError}</h1>
            }
            {
                isBooksLoading
                ?
                <div style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}><Loader /></div>
                :
                <Grid container spacing={4}>
                    {books.map((book, index) =>
                        <Grid key={book.id_book + 10} item xs={3}>
                            <BookItem book={book} key={index} />
                        </Grid>
                    )}
                </Grid>
            }
        </div>
    );
};

export default BookList;