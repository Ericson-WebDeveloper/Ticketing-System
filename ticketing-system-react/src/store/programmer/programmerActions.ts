import axs from '../../axios/axios';
import {Csrf} from '../../axios/csrf';
import axios from 'axios';
import {SET_ALL_MYTICKETS, SET_OPENTICKETS, SET_PROG_ERROR, SET_PROG_LOADING, SET_PROG_SUCCESS, 
    SET_QA_ICKETS, SET_UPDATE_ALLTICKETS, 
    SET_UPDATE_ASSIGN_QATICKETS, 
    //SET_UPDATE_OPENTICKETS, 
    SET_UPDATE_TICKETS} from './programmerSlice'
import { AnyAction, Dispatch } from '@reduxjs/toolkit';
import { TicketOnProgress } from '../../components/User/ViewTicket';


export const getTicketsAssignQA = (page = 1) => async(dispatch: Dispatch<AnyAction>): Promise<void> => {
    try {
        dispatch(SET_PROG_LOADING(true));
        let {data} = await axs.get(`/api/backend/ticketing-system/tickets-qa/assign?page=${page}`);
        console.log(data.tickets.data)
        dispatch(SET_QA_ICKETS(data.tickets));
    } catch (error) {
        dispatch(SET_PROG_ERROR({error: 'Data Not Found', errors: null}));
        dispatch(SET_QA_ICKETS(null));
    } finally {
        dispatch(SET_PROG_LOADING(false));
    }
}

export const assignToQa = async(data: {user_id: number}, id: number) => {
    return await axs.put(`/api/backend/ticketing-system/ticket/assigningQa/${id}`, data); 
}

export const assignToOwner = (id: number) => async(dispatch: Dispatch<AnyAction>) => {
    return await axs.put(`/api/backend/ticketing-system/ticket/assigningOwner/${id}`); 
}

export const getTicketsUserNotComplete = () => async(dispatch: Dispatch<AnyAction>) => {
    try {
        dispatch(SET_PROG_LOADING(true));
        let {data} = await axs.get(`/api/backend/ticketing-system/tickets-user/on-going`);
        dispatch(SET_OPENTICKETS(data.tickets));
    } catch (error) {
        dispatch(SET_PROG_ERROR({error: 'Data Not Found', errors: null}));
        dispatch(SET_OPENTICKETS([]));
    } finally {
        dispatch(SET_PROG_LOADING(false));
    }
}

export const updateRemarks = async(data: {remarks: string}, id: number) => {
    return await axs.put(`/api/backend/ticketing-system/ticket/update-remarks/${id}`, data);  
}


export const updateTicketOnProgress = (datas: TicketOnProgress, id: number, setModal: React.Dispatch<React.SetStateAction<string>>, type: string) => async(dispatch: Dispatch<AnyAction>) => {
    try {
        dispatch(SET_PROG_LOADING(true));
        let {data} = await axs.put(`/api/backend/ticketing-system/ticket/update/${id}`, datas);
        if(type === 'all') {
           dispatch(SET_UPDATE_ALLTICKETS({id, ticket: data.ticket})); 
        } 
        if(type === "open") {
            dispatch(SET_UPDATE_TICKETS({id, ticket: data.ticket}));
        }
        if(type === 'qa') {
            dispatch(SET_UPDATE_ASSIGN_QATICKETS({id, ticket: data.ticket}));
        }
        dispatch(SET_PROG_SUCCESS(data.message));
        setModal('')
    } catch (error: any) {
        if(axios.isAxiosError(error)) {
            dispatch(SET_PROG_ERROR({error: error.message, errors: null}));
        } else if(error.response.status === 422) {
            dispatch(SET_PROG_ERROR({error: null, errors: error.response.data.errors}));
        } else if(error.response.status === 400) {
            dispatch(SET_PROG_ERROR({error: error.response.data.error, errors: null}));
        } else {
            dispatch(SET_PROG_ERROR({error: 'System Error. please try again or later', errors: null}));
        }
    } finally {
        dispatch(SET_PROG_LOADING(false));
    }
}


export const getTicketsUserAll = (page = 1) => async(dispatch: Dispatch<AnyAction>) => {
    try {
        dispatch(SET_PROG_LOADING(true));
        let {data} = await axs.get(`/api/backend/ticketing-system/tickets-user/list?page=${page}`);
        dispatch(SET_ALL_MYTICKETS(data.tickets));
    } catch (error) {
        dispatch(SET_PROG_ERROR({error: 'Data Not Found', errors: null}));
        dispatch(SET_ALL_MYTICKETS(null));
    } finally {
        dispatch(SET_PROG_LOADING(false));
    }
}