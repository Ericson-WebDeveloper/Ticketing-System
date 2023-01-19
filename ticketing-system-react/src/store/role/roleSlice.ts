import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RoleInterface } from '../../models/Role';
import { RootState } from '../store';


interface RoleState {
    roles: RoleInterface[];
    error: any| null;
    errors: any | null;
    loading: boolean
}

const initialState: RoleState = {
    roles: [],
    error: null,
    errors: null,
    loading: false
}

export const roleSlice = createSlice({
  name: 'role',
  initialState,
  reducers: {
    SET_ROLES_REQUEST: (state, action: PayloadAction<boolean>) => {
        state.loading = action.payload;
    },
    SET_ROLES_ERRORS: (state, action: PayloadAction<{error: any, errors: any}>) => {
        state.error = action.payload.error;
        state.errors = action.payload.errors;
    },
    SET_RESET_ERROR_ROLES: (state) => {
        state.error = null;
        state.errors = null;
    },
    SET_ROLES: (state, action: PayloadAction<RoleInterface[]>) => {
        state.roles = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { SET_ROLES_REQUEST, SET_ROLES_ERRORS, SET_RESET_ERROR_ROLES, SET_ROLES } = roleSlice.actions

export const rolesAll = (state: RootState) => state.role.roles;
export const rolesLoading = (state: RootState) => state.role.loading

export default roleSlice.reducer

export const rolesMemoized = createSelector(
    [rolesAll], (roles) => {
        return roles;
    }
)