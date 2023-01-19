import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DatasWPagesState } from '../../models/DatawPages';
import { TicketENVInterface, TicketInterface, TicketStatusInterface, TicketTypeInterface } from '../../models/Ticket';
import { UserInterface } from '../../models/User';

interface TicketState {
    tickets: TicketInterface<UserInterface>[],
    ticketsfilter: Array<unknown>,
    ticket: TicketInterface<UserInterface> | null,
    // status: [{id:0, status_name:'all'}],
    error: any | null,
    errors: any | null,
    loading: boolean,
    success: any | null,
    ticketuserall: DatasWPagesState<TicketInterface<UserInterface>> | UserInterface[] | [],
    ticketuseralltemp: DatasWPagesState<TicketInterface<UserInterface>> | UserInterface[] | [],
}


const ticketState: TicketState = {
    tickets: [],
    ticketsfilter: [],
    ticket: null,
    // status: [{id:0, status_name:'all'}],
    error: null,
    errors: null,
    loading: false,
    success: null,
    ticketuserall: [],
    ticketuseralltemp: [],
}
export const ticketSlice = createSlice({
  name: 'ticket',
  initialState: ticketState,
  reducers: {
    SET_TICKETS_REQUEST: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    SET_OPEN_TICKETS: (state, action: PayloadAction<TicketInterface<UserInterface>[]>) => {
      state.tickets = action.payload;
    },
    SET_TICKETS_ERROR: (state, action: PayloadAction<{error: any | null,
      errors: any | null}>) => {
      state.error = action.payload.error;
      state.errors = action.payload.errors;
    },
    SET_ERROR_RESET:(state) => {
      state.error = null;
      state.errors = null;
    },
    SET_SUCCESS: (state, action: PayloadAction<any | null>) => {
      state.success = action.payload;
    },
    SET_TICKET: (state, action: PayloadAction<TicketInterface<UserInterface> | null>) => {
      state.ticket = action.payload;
    },

    SET_USER_TICKETS: (state, action: PayloadAction<DatasWPagesState<TicketInterface<UserInterface>> | UserInterface[] | []>) => {
      state.ticketuserall = action.payload;
      state.ticketuseralltemp = action.payload;
    },

    SET_USER_TICKETS_DEFAULT: (state) => {
      state.ticketuseralltemp = JSON.parse(JSON.stringify(state.ticketuserall));
    },
    
    SET_USER_TICKETS_FILTER: (state, action: PayloadAction<string>) => {
      if(!('data' in state.ticketuserall)) {
        let usersTickets: UserInterface[] = JSON.parse(JSON.stringify(state.ticketuserall));
        let newSetTickets: UserInterface[] = [];
        usersTickets?.forEach((user: UserInterface) => {
          let tickets = JSON.parse(JSON.stringify(user?.programmertickets))
          user.programmertickets = [];
          tickets.forEach((progTickets: TicketInterface<UserInterface>) => {
              if(progTickets?.progress?.status?.status_name === action.payload) {
                user?.programmertickets?.push({...progTickets})
              } 
          });
          if(user.programmertickets.length > 0) {
            newSetTickets.push({...user})
          }
        });
       
        state.ticketuseralltemp = [...newSetTickets] ;
      }
      
    },
    SET_NEW_UPATE_USERTICKET: (state, action: PayloadAction<{ticket: TicketInterface<UserInterface>}>) => {
      // let index = state.ticketuserall.findIndex(({id}) => id === action.payload.ticket.id);
      // state.ticketuserall[index] = action.payload.ticket;
      // i remove the data
      if('data' in state.ticketuserall) {
        console.log('HERE')
        let index = state.ticketuserall?.data.findIndex(({id}) => id === action.payload.ticket.id);
        console.log(index);
        console.log(action.payload.ticket)
        state.ticketuserall.data[index] = action.payload.ticket;
      }
      
    }
  },
})
// Action creators are generated for each case reducer function
export const { SET_OPEN_TICKETS, SET_TICKETS_REQUEST, SET_TICKETS_ERROR, SET_ERROR_RESET, SET_SUCCESS, SET_TICKET, 
                SET_USER_TICKETS, SET_USER_TICKETS_DEFAULT, SET_USER_TICKETS_FILTER, 
                SET_NEW_UPATE_USERTICKET } = ticketSlice.actions
export const ticketReducer = ticketSlice.reducer;

// export default  ticketSlice.reducer


interface ENVReducerState {
  env: TicketENVInterface[];
  error: any | null;
  errors: Array<unknown> | null;
  loading: boolean
}

// Ticket ENV
const ENVState: ENVReducerState = {
  env: [],
  error: null,
  errors: null,
  loading: false
}
export const ENVSlice = createSlice({
  name: 'env',
  initialState: ENVState,
  reducers: {
    SET_ENV_REQUEST: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    SET_ENV_ERROR: (state, action: PayloadAction<any|null>) => {
      state.error = action.payload;
    },
    SET_ENV_ERROR2: (state, action: PayloadAction<Array<unknown> | null>) => {
      state.errors = action.payload;
    },
    SET_ENV_LIST: (state, action: PayloadAction<TicketENVInterface[]>) => {
      state.env = action.payload;
    },
    SET_ENV_RESET: (state) => {
      state.error = null;
      state.errors = null;
    }
  },
});

export const { SET_ENV_REQUEST, SET_ENV_ERROR, SET_ENV_ERROR2, SET_ENV_LIST, SET_ENV_RESET } = ENVSlice.actions
export const envReducer = ENVSlice.reducer;



interface StatusReducerState {
  status: TicketStatusInterface[];
  error: any | null;
  errors: Array<unknown> | null;
  loading: boolean
}
// status
const statusState:StatusReducerState = {
  status: [],
  error: null,
  errors: null,
  loading: false
}
export const statusSlice = createSlice({
  name: 'status',
  initialState: statusState,
  reducers: {
    SET_STATUS_REQUEST: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    SET_STATUS_ERROR: (state, action: PayloadAction< any | null>) => {
      state.error = action.payload;
    },
    SET_STATUS_ERROR2: (state, action: PayloadAction< Array<unknown> | null>) => {
      state.errors = action.payload;
    },
    SET_STATUS_LISTS: (state, action: PayloadAction<TicketStatusInterface[]>) => {
      state.status = action.payload;
    },
    SET_STATUS_RESET: (state) => {
      state.error = null;
      state.errors = null;
    }
  },
});

export const { SET_STATUS_REQUEST, SET_STATUS_ERROR, SET_STATUS_ERROR2, SET_STATUS_LISTS, SET_STATUS_RESET } = statusSlice.actions
export const statusReducer = statusSlice.reducer;


interface TypeReducerState {
  type: TicketTypeInterface[];
  error: any | null;
  errors: Array<unknown> | null;
  loading: boolean
}
// type
const typeState: TypeReducerState = {
  type: [],
  error: null,
  errors: null,
  loading: false
}
export const typeSlice = createSlice({
  name: 'type',
  initialState: typeState,
  reducers: {
    SET_TYPE_REQUEST: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    SET_TYPE_ERROR: (state, action: PayloadAction<any | null>) => {
      state.error = action.payload;
    },
    SET_TYPE_ERROR2: (state, action: PayloadAction<Array<unknown> | null>) => {
      state.errors = action.payload;
    },
    SET_TYPE_LISTS: (state, action: PayloadAction<TicketTypeInterface[]>) => {
      state.type = action.payload;
    },
    SET_TYPE_RESET: (state) => {
      state.error = null;
      state.errors = null;
    }
  },
});

export const { SET_TYPE_REQUEST, SET_TYPE_ERROR, SET_TYPE_ERROR2, SET_TYPE_LISTS, SET_TYPE_RESET } = typeSlice.actions
export const typeReducer = typeSlice.reducer;
