import React, { useState } from 'react';

import { TextField } from '@material-ui/core';

import './LoginPage.css'

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const login = (e) => {
        e.preventDefault();

        console.log(username);
        console.log(password);
    }

    return (
        <div className="login_container">
            <div className="login_form">
                <form onSubmit={login}>
                    <div className='input_form'>
                        <TextField
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            variant="outlined"
                            label="Login"
                        />
                    </div>
                    <div className='input_form'>
                        <TextField
                            value={password}
                            type='password'
                            onChange={(e) => setPassword(e.target.value)}
                            variant="outlined"
                            label="Password"
                        />
                    </div>
                    <div className="submit_button">
                        <input type="submit" value="Sign in"/>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;