import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { deleteToken } from '../../axios/csrf';
import { getAuth, setAsLogged, setLogout } from '../../helper/AuthHelper';
import { JobInterface } from '../../models/Job';
import { RoleInterface } from '../../models/Role';
import { UserDetailInterface, UserInterface } from '../../models/User';
import { TicketInterface, TicketProgressInterface } from '../../models/Ticket';
import { RootState } from '../store';
import { DatasWPagesState } from '../../models/DatawPages';

interface DashState {
    status: {status_name: string, status_total: number}[],
    users: {name: string, user_total: number}[] | null,
    env: {environment_name: string, environment_total: number}[],
    type: {type_name: string, type_total: number}[],
}

interface UserSliceInterface {
    auth: boolean;
    user: UserInterface | null;
    userLoading: boolean;
    userError: string | null;
    userErrors: any | null;
    loading: boolean;
    success: any | null,
    qas: UserInterface[],
    programmers: UserInterface[],
    users: DatasWPagesState<UserInterface> | null,
    viewUser: UserInterface | null;
    dash: DashState | null;
}



const initialState: UserSliceInterface = {
    auth: getAuth(),
    user: localStorage.getItem('auth_user_') ? JSON.parse(localStorage.getItem('auth_user_')!) : null,
    userLoading: false,
    userError: null,
    userErrors: null,
    loading: false,
    success: null,
    qas: [],
    programmers: [],
    users: null,
    viewUser: null,
    dash: null
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    SET_AUTH: (state, action: PayloadAction<UserInterface>) => {
        setAsLogged();
        localStorage.setItem('auth_user_', JSON.stringify(action.payload));
        state.user = action.payload;
        state.auth = true;
    },
    SET_NEW_PROFILE: (state, action: PayloadAction<UserInterface>) => {
        localStorage.setItem('auth_user_', JSON.stringify(action.payload));
        state.user = action.payload;
    },
    SET_LOGOUT: state => {
        setLogout();
        localStorage.removeItem('auth_user_');
        deleteToken();
        state.user = null;
        state.auth = false;
    },
    SET_ERROR: (state, action: PayloadAction<string | null>) => {
        state.userError = action.payload;
    },
    SET_ERRORS: (state, action: PayloadAction<any | null>) => {
        state.userErrors = action.payload;
    },
    SET_RESET_ERROR: (state) => {
        state.userError = null;
        state.userErrors = null;
    },
    SET_USER_LOADING: (state, action: PayloadAction<boolean>) => {
        state.userLoading = action.payload;
    },
    SET_QAS: (state, action: PayloadAction<UserInterface[]>) => {
        state.qas = action.payload;
    },
    SET_PROGRAMMERS: (state, action: PayloadAction<UserInterface[]>) => {
        state.programmers = action.payload;
    },

    // crud
    SET_U_LOAIDNG: (state, action: PayloadAction<boolean>) => {
        state.loading = action.payload;
    },
    SET_U_SUCCESS: (state, action: PayloadAction<any>) => {
        state.success = action.payload;
    },

    // users
    SET_ALL_USERS: (state, action: PayloadAction<DatasWPagesState<UserInterface> | null>) => {
        state.users = action.payload;
    },
    SETVIEW_USER: (state, action: PayloadAction<UserInterface | null>) => {
        state.viewUser = action.payload
    },

    SET_DASH: (state, action: PayloadAction<DashState | null>) => {
        state.dash = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { SET_AUTH, SET_LOGOUT, SET_RESET_ERROR, SET_USER_LOADING, SET_ERROR, SET_ERRORS, SET_QAS, SET_PROGRAMMERS, 
                SET_U_LOAIDNG, SET_U_SUCCESS, 
                SET_ALL_USERS, SETVIEW_USER, 
                SET_NEW_PROFILE, 
                SET_DASH } = userSlice.actions

export const userLoad = (state: RootState) => state.user.userLoading;
export const usersQA = (state: RootState) => state.user.qas;
export const usersProgrammer= (state: RootState) => state.user.programmers;

export const userLoading = (state: RootState) => state.user.loading;
export const userCrudError = (state: RootState) => state.user.userError;
export const userCrudErrors = (state: RootState) => state.user.userErrors;
export const userCrudSuccess = (state: RootState) => state.user.success;

export const usersAll = (state: RootState) => state.user.users;

export const userViewSelector = (state: RootState) => state.user.viewUser;

export default userSlice.reducer