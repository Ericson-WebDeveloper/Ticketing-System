import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IndexState {
    page: string
}

const initialState:IndexState = {
    page: ""
}

export const indexSlice = createSlice({
  name: 'index',
  initialState,
  reducers: {
    SET_PAGE: (state, action: PayloadAction<string>) => {
        state.page = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { SET_PAGE } = indexSlice.actions

export default indexSlice.reducer