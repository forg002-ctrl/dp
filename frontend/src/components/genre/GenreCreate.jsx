import React, { useState } from 'react';
import { TextField, Grid } from '@material-ui/core';

import { GenreService } from '../../services/GenreService';

const GenreCreate = () => {
    const [name, setName] = useState('');

    const createGenre = (e) => {
        e.preventDefault();

        let response = GenreService.createGenre({
            name: name,
        });

        if (response) {
            clearFields();
        }
    }

    const clearFields = () => {
        setName('');
    }

    return (
        <div style={{padding: '40px'}}>      
                <form variant="standard" sx={{ m: 1, minWidth: 120 }} onSubmit={createGenre}>
                    <Grid item style={{ padding: '20px 10px 10px 10px' }}>
                        <TextField
                            value={name}
                            required
                            onChange={(e) => setName(e.target.value)}
                            variant="outlined"
                            label="Name" />
                    </Grid>
                    <Grid item style={{ padding: '10px' }}>
                        <input type="submit" value="Create Genre"/>
                    </Grid>
                </form>
        </div>
    );
};

export default GenreCreate;