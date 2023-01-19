import { AnyAction, Dispatch } from '@reduxjs/toolkit';
import axs from '../../axios/axios';
import {Csrf} from '../../axios/csrf';
import { SET_JOBS, SET_JOB_ERRORS, SET_JOB_REQUEST } from './jobSlice';


export const getJobs = () => async (dispatch: Dispatch<AnyAction>) => {
    try {
        dispatch(SET_JOB_REQUEST(true));
        await Csrf();
        let {data} = await axs.get(`/api/backend/ticketing-system/jobs`);
        dispatch(SET_JOBS(data.jobs));
    } catch (error) {
        dispatch(SET_JOBS([]));
        dispatch(SET_JOB_ERRORS({error: 'Cannot Connect to Server', errors: []}));
    } finally {
        dispatch(SET_JOB_REQUEST(false));
    }
}