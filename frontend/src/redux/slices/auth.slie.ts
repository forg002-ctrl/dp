import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { LocalStorage } from 'helpers/localStorage';

import { RootState } from 'redux/store';

import { AuthService } from 'services/AuthService';

export interface IAuthentication {
  isProcessingRequest: boolean;
  accessToken?: string;
}

const initialState: IAuthentication = { isProcessingRequest: false };
export const authenticationSlice = createSlice({
    name: 'authentication',
    initialState,
    reducers: {
        start: (state) => {
            return {
                ...state,
                isProcessingRequest: true,
            };
        },
        success: (state, action: PayloadAction<any>) => {
            return {
                ...state,
                isProcessingRequest: false,
            };
        },
        error: (state, action: PayloadAction<string>) => {
            return {
                ...state,
                isProcessingRequest: false,
            };
        },
    },
});

export const authenticateUser = (userData: any, history: any) => async (dispatch: any) => {
    const authService = new AuthService();
    try {
        const authData = await authService.login(userData);

        LocalStorage.setUser(authData.user);
        LocalStorage.setAccessToken(authData.accessToken);
        dispatch(success(authData.user));
        history('/');
    } catch (err) {
        dispatch(error(err));
    }
};

export const logoutUser = (history: any) => {
    LocalStorage.removeLocalData();
    history('/login');
};


export const { start, success, error } = authenticationSlice.actions;
export const authenticationReducer = authenticationSlice.reducer;
export const selectAuthentication = (state: RootState) => state.authentication;