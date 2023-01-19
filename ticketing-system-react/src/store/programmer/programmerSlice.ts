import { createSlice, createSelector, PayloadAction } from '@reduxjs/toolkit';
import { DatasWPagesState } from '../../models/DatawPages';
import { TicketInterface } from '../../models/Ticket';
import { UserInterface } from '../../models/User';
import { RootState } from '../store';

interface ProgrammerState {
    qa_tickets: DatasWPagesState<TicketInterface<UserInterface>> | null;
    open_tickets: TicketInterface<UserInterface>[];
    all_tickets: DatasWPagesState<TicketInterface<UserInterface>> | null;

    ticket: TicketInterface<UserInterface> | null;
    progError: any | null;
    progErrors: any | null;
    progSuccess: any | null;
    progLoading: boolean;
}


const initialState: ProgrammerState = {
    qa_tickets: null, // me as qa in this tickets
    open_tickets: [], // user open tikcets not completed

    // my tickets both programmer and qa id
    // both open and completed
    all_tickets: null,
    ticket: null,

    progError: null,
    progErrors: null,
    progSuccess: null,
    progLoading: false
}

export const programmerSlice = createSlice({
  name: 'programmer',
  initialState,
  reducers: {
    SET_PROG_LOADING: (state, action: PayloadAction<boolean>) => {
        state.progLoading = action.payload;
    },
    SET_PROG_ERROR: (state, action: PayloadAction<{error: any|null, errors: any|null}>) => {
        state.progError = action.payload.error;
        state.progErrors = action.payload.errors;
    },
    SET_OPENTICKETS: (state, action: PayloadAction<TicketInterface<UserInterface>[]>) => {
        state.open_tickets = action.payload
    },
    SET_QA_ICKETS: (state, action: PayloadAction<DatasWPagesState<TicketInterface<UserInterface>> | null>) => {
        state.qa_tickets = action.payload
    },
    SET_ALL_MYTICKETS: (state, action: PayloadAction<DatasWPagesState<TicketInterface<UserInterface>> | null>) => {
        state.all_tickets = action.payload;
    },
    SET_PROG_SUCCESS: (state, action: PayloadAction<any | null>) => {
        state.progSuccess = action.payload
    },
    SET_UPDATE_TICKETS: (state, action: PayloadAction<{ticket:TicketInterface<UserInterface>, id: number}>) => {
        let index = state.open_tickets.findIndex((ticket) => ticket.id === action.payload.id);
        state.open_tickets[index] = action.payload.ticket;
    },
    SET_UPDATE_ALLTICKETS: (state, action: PayloadAction<{ticket:TicketInterface<UserInterface>, id: number}>) => {
        let index: number = state.all_tickets?.data.findIndex((ticket) => ticket.id === action.payload.id) as number;
        state.all_tickets!.data[index] = action.payload.ticket;
    },
    SET_UPDATE_ASSIGN_QATICKETS: (state, action: PayloadAction<{ticket:TicketInterface<UserInterface>, id: number}>) => {
        let index: number = state.qa_tickets?.data.findIndex((ticket) => ticket.id === action.payload.id) as number;
        state.qa_tickets!.data[index] = action.payload.ticket;
    },
  },
})

// Action creators are generated for each case reducer function
export const { SET_PROG_LOADING, SET_PROG_ERROR, SET_OPENTICKETS, SET_QA_ICKETS, SET_ALL_MYTICKETS, SET_PROG_SUCCESS, 
    SET_UPDATE_TICKETS, SET_UPDATE_ALLTICKETS, SET_UPDATE_ASSIGN_QATICKETS } = programmerSlice.actions;

export const openTickets = (state: RootState) => state.programmer.open_tickets;
export const Ticketsqa = (state: RootState) => state.programmer.qa_tickets;
export const allTickets = (state: RootState) => state.programmer.all_tickets;
export const loadingProg = (state: RootState) => state.programmer.progLoading;
export const errorProg = (state: RootState) => state.programmer.progError;
export const errorsProg = (state: RootState) => state.programmer.progErrors;

export default programmerSlice.reducer;

export const AllTicketsQA = createSelector(
    [Ticketsqa], (tickets) => {
        return tickets;
    }
)