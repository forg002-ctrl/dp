import { configureStore } from '@reduxjs/toolkit';

import { authenticationReducer } from 'redux/slices/auth.slie';

export const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
    // userList: usersListReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;