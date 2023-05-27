import React, { useState } from 'react';
import { TextField, Grid } from '@material-ui/core';

import { AuthorService } from '../../services/AuthorService';

const AuthorCreate = () => {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [info, setInfo] = useState('');
    const [birthdate, setBirthdate] = useState('');

    const createAuthor = (e) => {
        e.preventDefault();

        let response = AuthorService.createAuthor({
            firstname: firstname,
            lastname: lastname,
            birthdate: birthdate,
            info: info,
        });

        if (response) {
            clearFields();
        }
    }

    const clearFields = () => {
        setFirstname('');
        setLastname('');
        setBirthdate('');
        setInfo('');
    }

    return (
        <div style={{padding: '40px'}}>      
                <form variant="standard" sx={{ m: 1, minWidth: 120 }} onSubmit={createAuthor}>
                    <Grid item style={{ padding: '20px 10px 10px 10px' }}>
                        <TextField
                            value={firstname}
                            required
                            onChange={(e) => setFirstname(e.target.value)}
                            variant="outlined"
                            label="Firstname" />
                    </Grid>
                    <Grid item style={{ padding: '20px 10px 10px 10px' }}>
                        <TextField
                            value={lastname}
                            required
                            onChange={(e) => setLastname(e.target.value)}
                            variant="outlined"
                            label="Lastname" />
                    </Grid>
                    <Grid item style={{ padding: '20px 10px 10px 10px' }}>
                        <TextField
                            value={info}
                            required
                            onChange={(e) => setInfo(e.target.value)}
                            variant="outlined"
                            label="Info" />
                    </Grid>
                    <Grid item style={{ padding: '20px 10px 10px 10px' }}>
                        <TextField
                            value={birthdate}
                            required type={'date'}
                            onChange={(e) => setBirthdate(e.target.value)}
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item style={{ padding: '10px' }}>
                        <input type="submit" value="Create Author"/>
                    </Grid>
                </form>
        </div>
    );
};

export default AuthorCreate;