import React from 'react';
import { Card, Typography, Grid, Container } from '@material-ui/core';

const BookItem = ({book}) => {
    return (
        <Card>
            <Container style={{display: 'flex', justifyContent: 'center'}}>
                <img src={book.imageName} style={{height: '200px', width: '140px'}}/>
            </Container>
            <Typography variant="h6" style={{padding: '10px 0px 0px 15px'}}><b>{book.title}</b></Typography>
            <Typography variant="subtitle2" style={{padding: '10px 0px 0px 15px'}}><b>{book.author_fullname}</b></Typography>
            <hr />
            <Grid container>
                <Grid item xs={8}>
                    <Typography variant="subtitle1" style={{padding: '10px 0px 0px 15px'}}>Genre: <b> {book.genre_name} </b> </Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography variant="subtitle1" color="secondary" style={{padding: '10px 0px 0px 15px'}}>Price: <b> {book.price} $ </b> </Typography>
                </Grid>
            </Grid>
            <br/>
        </Card>
    );
};

export default BookItem;