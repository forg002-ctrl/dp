import React, { useState } from 'react';
import { TextField } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from 'hooks/useAppDispatch';
import { AuthService } from 'services/AuthService';
import { authenticateUser } from 'redux/slices/auth.slie';

export const LoginPage = () => {
    const dispatch = useAppDispatch();
    let navigate = useNavigate();
    if (AuthService.isAuthenticated()) {
        navigate('/');
}

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const login = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        await dispatch(authenticateUser({
            username: username,
            password: password,
        }, navigate));
    }

    return (
        <div className="flex items-center justify-center flex-col gap-5 h-screen bg-[#f8f9fd]">
            <div className="bg-white p-8 shadow-md">
                <form onSubmit={login}>
                    <div className='flex flex-col gap-2 m-2 pt-2'>
                        <TextField
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            variant="outlined"
                            label="Login"
                        />
                    </div>
                    <div className='flex flex-col gap-2 m-2 pt-2'>
                        <TextField
                            value={password}
                            type='password'
                            onChange={(e) => setPassword(e.target.value)}
                            variant="outlined"
                            label="Password"
                        />
                    </div>
                    <div className="flex justify-center">
                        <input type="submit" className="mt-2 cursor-pointer text-sm bg-[#01d28e] border-2 px-2 py-4 bg-[#6cf0c2]:hover" value="Sign in"/>
                    </div>
                </form>
            </div>
        </div>
    );
};