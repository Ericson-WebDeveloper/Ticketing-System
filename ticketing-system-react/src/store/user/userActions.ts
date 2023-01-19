import { AnyAction, Dispatch } from '@reduxjs/toolkit';
import axs from '../../axios/axios';
import {Csrf} from '../../axios/csrf';
import { UpdateUserFormInterface } from '../../components/EditUserModal';
import { ProfileFormType } from '../../pages/admin/Profile';
import { SETVIEW_USER, SET_ALL_USERS, SET_DASH, SET_ERROR, SET_ERRORS, SET_PROGRAMMERS, 
    SET_QAS, SET_RESET_ERROR, SET_USER_LOADING, SET_U_LOAIDNG, SET_U_SUCCESS } from './userSlice';


export const login = async(data: {email: string, password: string}) => {
    await Csrf();
    return await axs.post('/ticketing-system/login', data);
} 

export const reset = async(data: {email: string}) => {
    await Csrf();
    return await axs.post('/ticketing-system/forgot-password', data);
} 

export const checkToken = async(data: { email: string, token: string }) => {
    await Csrf();
    return await axs.post('/ticketing-system/check-validate', data);
} 

export const requestSendEmail = async (data: {ticket_id: number, p_id: number}) => {
    await Csrf();
    return await axs.post('/api/backend/ticketing-system/send-notif/email', data);
}

export const updatePassForget = async(data: {email: string, token: string, password: string, password_confirm: string}) => {
    await Csrf();
    return await axs.put(`/ticketing-system/update-password/${data.email}`, data);
} 

export const autheticate = async() => {
    await Csrf();
    return await axs.get('/api/backend/ticketing-system/authenticate-user');
}

export const signOutUser = async() => {
    await Csrf();
    return await axs.post('/api/user/sign-out');
}

export const getDashData = () => async(dispatch: Dispatch<AnyAction>): Promise<void> => {
    try {
        dispatch(SET_USER_LOADING(true));
        await Csrf();
        let response = await axs.get(`/api/backend/ticketing-system/tickets/dashboard-all`);
        dispatch(SET_DASH(response.data));
    } catch (error) {
        dispatch(SET_ERROR('Cannot Connect to Server'));
        dispatch(SET_DASH(null));
    } finally {
        dispatch(SET_USER_LOADING(false));
    }
}

export const getQAs = () => async(dispatch: Dispatch<AnyAction>) => {
    try {
        dispatch(SET_USER_LOADING(true));
        await Csrf();
        let response = await axs.get(`/api/backend/ticketing-system/user-qa/all`);
        dispatch(SET_QAS(response.data.users));
    } catch (error) {
        dispatch(SET_ERROR('User Q A Get Failed. Cannot Connect to Server'));
        dispatch(SET_QAS([]));
    } finally {
        dispatch(SET_USER_LOADING(false));
    }
}

export const getProgrammers = () => async(dispatch: Dispatch<AnyAction>) => {
    try {
        dispatch(SET_USER_LOADING(true));
        await Csrf();
        let response = await axs.get(`/api/backend/ticketing-system/user-programmer/all`);
        dispatch(SET_PROGRAMMERS(response.data.users));
    } catch (error) {
        dispatch(SET_ERROR('User Programmer Get Failed. Cannot Connect to Server'));
        dispatch(SET_PROGRAMMERS([]));
    } finally {
        dispatch(SET_USER_LOADING(false));
    }
}

export const getUserAll = () => async(dispatch: Dispatch<AnyAction>) => {
    try {
        dispatch(SET_U_LOAIDNG(true));
        await Csrf();
        let response = await axs.get(`/api/backend/ticketing-system/user/all`);
        dispatch(SET_ALL_USERS(response.data.users));
    } catch (error) {
        dispatch(SET_ERROR('Cannot Connect to Server'));
        // dispatch(SET_ALL_USERS([]));
        dispatch(SET_ALL_USERS(null));
    } finally {
        dispatch(SET_U_LOAIDNG(false));
    }
}

export const getUsers = (page = 1) => async(dispatch: Dispatch<AnyAction>): Promise<void> => {
    try {
        dispatch(SET_U_LOAIDNG(true));
        await Csrf();
        let response = await axs.get(`/api/backend/ticketing-system/users/all?page=${page}`);
        dispatch(SET_ALL_USERS(response.data.users));
    } catch (error) {
        dispatch(SET_ERROR('Cannot Connect to Server'));
        // dispatch(SET_ALL_USERS([]));
        dispatch(SET_ALL_USERS(null));
    } finally {
        dispatch(SET_U_LOAIDNG(false));
    }
}

export const addNewUser = (data: FormData) => async (dispatch: Dispatch<AnyAction>) => {
    await Csrf();
    return  await axs.post(`/api/backend/ticketing-system/user-create`,data);
    // try {
    //     dispatch(SET_RESET_ERROR())
    //     dispatch(SET_U_LOAIDNG(true));
    //     await Csrf();
    //     await axs.post(`/api/backend/ticketing-system/user-create`,data);
    //     dispatch(SET_U_SUCCESS({message: 'New User Added!'}));
    // } catch (error) {
    //     if(error.response.status == 422) {
    //         dispatch(SET_ERRORS(error.response.data.errors));
    //         return;
    //      } else if(error.response.status == 400) {
    //         dispatch(SET_ERROR(error.response.data.error));
    //         return;
    //      } else {
    //          dispatch(SET_ERROR('Error'));
    //         return;
    //      }
    // } finally {
    //     dispatch(SET_U_LOAIDNG(false));
    // }
}

export const updateProfileImage = async (data: FormData) => {
    await Csrf();
    return await axs.post(`/api/backend/ticketing-system/user-image/update`,data);
}

export const updateUser = (data: UpdateUserFormInterface, id: number) => async (dispatch: Dispatch<AnyAction>) => {
    await Csrf();
    return await axs.put(`/api/backend/ticketing-system/user-update/${id}`,data);
}

export const updateProfile = async (data: FormData | ProfileFormType) => {
    await Csrf();
    return await axs.post(`/api/backend/ticketing-system/user-profile/update`,data);
}

export const getUser = (id: number) => async (dispatch: Dispatch<AnyAction>) => {
    try {
        dispatch(SETVIEW_USER(null));
        dispatch(SET_U_LOAIDNG(true));
        await Csrf();
        let {data} = await axs.get(`/api/backend/ticketing-system/${id}/user-get`);
        dispatch(SETVIEW_USER(data.user));
    } catch (error) {
        dispatch(SET_ERROR('Cannot Connect to Server'));
    } finally {
        dispatch(SET_U_LOAIDNG(false));
    }
}

export const getUser2 = (email: string) => async(dispatch: Dispatch<AnyAction>) => {
    try {
        dispatch(SETVIEW_USER(null));
        dispatch(SET_U_LOAIDNG(true));
        await Csrf();
        let {data} = await axs.get(`/api/backend/ticketing-system/user-get/${email}`);
        dispatch(SETVIEW_USER(data.user));
    } catch (error) {
        dispatch(SET_ERROR('Cannot Connect to Server'));
    } finally {
        dispatch(SET_U_LOAIDNG(false));
    }
}