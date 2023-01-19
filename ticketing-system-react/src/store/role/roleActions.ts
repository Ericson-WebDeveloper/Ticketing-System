import { AnyAction, Dispatch } from '@reduxjs/toolkit';
import axs from '../../axios/axios';
import {Csrf} from '../../axios/csrf';
import { SET_ROLES, SET_ROLES_ERRORS, SET_ROLES_REQUEST } from './roleSlice';


export const getRoles = () => async (dispatch: Dispatch<AnyAction>) => {
    try {
        dispatch(SET_ROLES_REQUEST(true));
        await Csrf();
        let {data} = await axs.get(`/api/backend/ticketing-system/roles`);
        dispatch(SET_ROLES(data.roles));
    } catch (error) {
        dispatch(SET_ROLES([]));
        dispatch(SET_ROLES_ERRORS({error: 'Cannot Connect to Server', errors: []}));
    } finally {
        dispatch(SET_ROLES_REQUEST(false));
    }
}