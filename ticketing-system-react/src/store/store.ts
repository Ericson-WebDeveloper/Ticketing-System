import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import userReducer from './user/userSlice';
import {ticketReducer} from './ticket/ticketSlice';
import {envReducer, typeReducer, statusReducer} from './ticket/ticketSlice';
import jobReducer from './job/jobSlice';
import roleReducer from './role/roleSlice';
import indexReducer from './indexSlice';
import programmerReducer from './programmer/programmerSlice';

export const store = configureStore({
  reducer: {
    index: indexReducer,
    user: userReducer,
    ticket: ticketReducer,
    ticketenv: envReducer,
    tickettype: typeReducer,
    ticketstatus: statusReducer,
    job: jobReducer,
    role: roleReducer,
    programmer: programmerReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;




// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector