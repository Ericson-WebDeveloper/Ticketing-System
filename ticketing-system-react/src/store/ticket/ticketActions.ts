import { AnyAction, Dispatch } from '@reduxjs/toolkit';
import axs from '../../axios/axios';
import {Csrf} from '../../axios/csrf';
import { AddNewTicketInterface } from '../../components/AddNewTicket';
import { SET_ENV_ERROR, SET_ENV_LIST, SET_ENV_REQUEST, SET_OPEN_TICKETS, SET_STATUS_ERROR, 
    SET_STATUS_LISTS, SET_STATUS_REQUEST, SET_TICKET, SET_TICKETS_ERROR, SET_TICKETS_REQUEST, SET_TYPE_ERROR, 
    SET_TYPE_LISTS, SET_TYPE_REQUEST, SET_USER_TICKETS } from './ticketSlice';


// export const getEnv = async () => {
//     await Csrf();
//     return await axs.get('/api/backend/ticketing-system/ticket/envs');
// }

// export const getType = async () => {
//     await Csrf();
//     return await axs.get('/api/backend/ticketing-system/ticket/type');
// }

// export const getStatus = async () => {
//     await Csrf();
//     return await axs.get('/api/backend/ticketing-system/ticket/status');
// }

export const getEnv = () => async (dispatch: Dispatch<AnyAction>) => {
    try {
        dispatch(SET_ENV_REQUEST(true));
        await Csrf();
        let response =  await axs.get('/api/backend/ticketing-system/ticket/envs');
        dispatch(SET_ENV_LIST(response.data.environments));
    } catch (error) {
        console.log(error);
        dispatch(SET_ENV_ERROR('Error Fetching'));
    } finally {
        dispatch(SET_ENV_REQUEST(false));
    }
    
}

export const getType = () => async (dispatch: Dispatch<AnyAction>) => {
    try {
        dispatch(SET_TYPE_REQUEST(true));
        await Csrf();
        let response = await axs.get('/api/backend/ticketing-system/ticket/type');
        dispatch(SET_TYPE_LISTS(response.data.types));
    } catch (error) {
        dispatch(SET_TYPE_ERROR('Error Fetching'));
    } finally {
        dispatch(SET_TYPE_REQUEST(false));
    }
    
}

export const getStatus = () => async (dispatch: Dispatch<AnyAction>) => {
    try {
        dispatch(SET_STATUS_REQUEST(true));
        await Csrf();
        let response = await axs.get('/api/backend/ticketing-system/ticket/status');
        dispatch(SET_STATUS_LISTS(response.data.status));
    } catch (error: any) {
        // if()
        dispatch(SET_STATUS_ERROR('Error Fetching'));
    } finally {
        dispatch(SET_STATUS_REQUEST(false));
    }
    
}

export const submitNewTicket = async(data: AddNewTicketInterface) => {
    await Csrf();
    return await axs.post('/api/backend/ticketing-system/add-new/ticket', data);
}

export const getOpenTickets = () => async (dispatch: Dispatch<AnyAction>) => {
    try {
        dispatch(SET_TICKETS_REQUEST(true))
        await Csrf();
        let response =  await axs.get('/api/backend/ticketing-system/open-tickets/all');
        dispatch(SET_OPEN_TICKETS(response.data.tickets));
    } catch (error) {
        dispatch(SET_TICKETS_ERROR({error: 'Error', errors: null}))
    } finally {
        dispatch(SET_TICKETS_REQUEST(false))
    }
}

export const getTicket = (id: number) => async (dispatch: Dispatch<AnyAction>) => {
    try {
        dispatch(SET_TICKET(null));
        dispatch(SET_TICKETS_REQUEST(true))
        await Csrf();
        let response = await axs.get(`/api/backend/ticketing-system/get-ticket/${id}`);
        dispatch(SET_TICKET(response.data.ticket));
    } catch (error: any) {
        let errorM = error.response.status == 403 ? error.response.data.message : 'Error Server';
        dispatch(SET_TICKETS_ERROR({error: errorM, errors: null}))
    } finally {
        dispatch(SET_TICKETS_REQUEST(false));
    }
}


export const ticketAssign = async(data: {programmer_id: number, qa_id: number}, id: number) => {
    await Csrf();
    return await axs.put(`/api/backend/ticketing-system/assign/open-ticket/${id}`, data);
}

export const ticketReAssignEmailNotif = async(data: {ticket_id: number}) => {
    await Csrf();
    return await axs.post(`/api/backend/ticketing-system/send-notif/ticket-reassign`, data);
}

export const OpenticketUpdate = async(data: {ticket_name: string, control_no: string, description: string, environment_id: number, status_id: number,
    type_id: number}, id: number) => {
    await Csrf();
    return await axs.put(`/api/backend/ticketing-system/edit/open-ticket/${id}`, data);
}

export const getUserTickets = () => async(dispatch: Dispatch<AnyAction>) => {
    try {
        dispatch(SET_TICKETS_REQUEST(true));
        await Csrf();
        let response =  await axs.get(`/api/backend/ticketing-system/user-tickets/all`);
        dispatch(SET_USER_TICKETS(response.data.users));
    } catch (error: any) {
        dispatch(SET_USER_TICKETS([]));
    } finally {
        dispatch(SET_TICKETS_REQUEST(false));
    }
}

export const getUserTickets2 = (userid: number, page = 1) => async(dispatch: Dispatch<AnyAction>): Promise<void> => {
    try {
        dispatch(SET_TICKETS_REQUEST(true));
        await Csrf();
        let response =  await axs.get(`/api/backend/ticketing-system/user-view/ticket/${userid}?page=${page}`);
        dispatch(SET_USER_TICKETS(response.data.tickets));
    } catch (error) {
        dispatch(SET_USER_TICKETS([]));
    } finally {
        dispatch(SET_TICKETS_REQUEST(false));
    }
}


export const getCountTickets = () => async (dispatch: Dispatch<AnyAction>): Promise<{id: number, count_total: number, status_name: string}[]> => {
    try {
        dispatch(SET_TICKETS_REQUEST(true));
        await Csrf();
        let {data} = await axs.get(`/api/backend/ticketing-system/count-ticket/status`);
        return data.counts;
    } catch (error) {
        return [];
    } finally {
        dispatch(SET_TICKETS_REQUEST(false));
    }
}
