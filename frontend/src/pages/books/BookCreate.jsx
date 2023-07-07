import React, { useState, useEffect } from 'react';
import { TextField, Grid, Button, MenuItem } from '@material-ui/core';

import { Loader } from '../../components/UI/loader/Loader';

import { useFetching } from '../../hooks/useFetching';

import { AuthorService } from '../../services/AuthorService';
import { GenreService } from '../../services/GenreService';
import { BookService } from '../../services/BookService';

const BookCreate = () => {
    const [authors, setAuthors] = useState([]);
    const [genres, setGenres] = useState([]);
    const [image, setImage] = useState({ preview: '', data: '' })

    const [title, setTitle] = useState('');
    const [price, setPrice] = useState(0);
    const [info, setInfo] = useState('');
    const [author, setAuthor] = useState();
    const [genre, setGenre] = useState();

    const [fetchAuthors, isAuthorsLoading, authorError] = useFetching(async () => {
        let response = await AuthorService.getAuthors();
        setAuthors(response.data.rows);
      });

    const [fetchGenres, isGenresLoading, genreError] = useFetching(async () => {
        let response = await GenreService.getGenres();    
        setGenres(response.data.rows);
    });
    
    const handleFileUpload = (e) => {
        if (!e.target.files) {
          return;
        }

        const img = {
            preview: URL.createObjectURL(e.target.files[0]),
            data: e.target.files[0],
        }
        setImage(img)
      };

    useEffect(() => {
        fetchAuthors();
        fetchGenres();
    }, []);

    const createBook = (e) => {
        e.preventDefault();

        let formData = new FormData();
        formData.append('file', image.data);
        formData.append('title', title);
        formData.append('price', price);
        formData.append('info', info);
        let id_author = JSON.parse(author).id_author;
        let id_genre = JSON.parse(genre).id_genre;
        formData.append('id_author', id_author);
        formData.append('id_genre', id_genre);

        let response = BookService.createBook(formData);
        if (response) {
            clearFields();
        }
    }

    const clearFields = () => {
        setImage({ preview: '', data: '' });
        setTitle('');
        setPrice(0);
        setInfo('');
        setAuthor();
        setGenre();
    }

    return (
        <div style={{padding: '40px'}}>      
            {
                authorError &&
                <h1>Error happend - {authorError}</h1>
            }
            {
                genreError &&
                <h1>Error happend - {genreError}</h1>
            }
            {
                isAuthorsLoading || isGenresLoading
                ?
                <div style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}><Loader /></div>
                :
                <form variant="standard" sx={{ m: 1, minWidth: 120 }} onSubmit={createBook}>
                    <Grid item style={{ padding: '20px 10px 10px 10px' }}>
                        <TextField
                            value={title}
                            required
                            onChange={(e) => setTitle(e.target.value)}
                            variant="outlined"
                            label="Title" />
                    </Grid>
                    <Grid item style={{ padding: '10px' }}>
                        <TextField
                            value={price}
                            required
                            onChange={(e) => setPrice(e.target.value)}
                            variant="outlined"
                            label="Price" />
                    </Grid>
                    <Grid item style={{ padding: '10px' }}>
                        <TextField
                            value={info}
                            required
                            onChange={(e) => setInfo(e.target.value)}
                            variant="outlined"
                            label="Info" />
                    </Grid>
                    <Grid item style={{ padding: '10px' }}>
                        <TextField
                            select required
                            label="Genre"
                            variant="outlined"
                            onChange={(e) => setGenre(e.target.value)}
                            InputLabelProps={{
                                shrink: true
                            }}
                            value={genre || ""}
                            defaultValue={""}
                        >
                            {genres.map((genre, index) => (
                                <MenuItem
                                    key={genre.id_genre}
                                    value={JSON.stringify({
                                        id_genre: genre.id_genre,
                                        name: genre.name,
                                        booksCount: genre.booksCount,
                                    })}
                                >
                                    {`${genre.name}`}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item style={{ padding: '10px' }}>
                        <TextField
                            select required
                            label="Author"
                            variant="outlined"
                            onChange={(e) => setAuthor(e.target.value)}
                            InputLabelProps={{
                                shrink: true
                            }}
                            value={author || ""}
                            defaultValue={""}
                        >
                            {authors.map((author, index) => (
                                <MenuItem
                                    key={author.id_author}
                                    value={JSON.stringify({
                                        id_author: author.id_author,
                                        firstname: author.firstname,
                                        lastname: author.lastname,
                                        booksCount: author.booksCount,
                                    })}
                                >
                                    {`${author.lastname} ${author.firstname}`}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid container style={{ padding: '10px', minHeight: '100px'}} spacing={5}>
                        <Grid item>
                            <Button
                                variant="contained"
                                component="label"
                            >
                                Upload Image
                                <input type="file" hidden onChange={handleFileUpload} />
                            </Button>
                        </Grid>
                        <Grid item>
                            {image.preview && <img src={image.preview} width='100' height='100' />}
                        </Grid>
                    </Grid>
                    <Grid item style={{ padding: '10px' }}>
                        <input type="submit" value="Create Book"/>
                    </Grid>
                </form>
            }
        </div>
    );
};

export default BookCreate;