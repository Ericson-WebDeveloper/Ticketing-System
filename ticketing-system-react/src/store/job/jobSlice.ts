import { createEntityAdapter, createSlice, createSelector, PayloadAction } from '@reduxjs/toolkit';
import { JobInterface } from '../../models/Job';
import { RootState } from '../store';
// const jobsAdapter = createEntityAdapter()

interface JobSliceInterface {
    jobs: JobInterface[];
    error: string | null;
    errors: any | null;
    loading: boolean;
}


// const jobsAdapter = createEntityAdapter<JobInterface[]>({
//     sortComparer: (a, b) => b.created_at.localeCompare(a.created_at)
// });

// const initialState: JobSliceInterface = jobsAdapter.getInitialState({
//     jobs: [],
//     error: null,
//     errors: null,
//     loading: false
// });


const initialState: JobSliceInterface = {
    jobs: [],
    error: null,
    errors: null,
    loading: false
};

export const jobSlice = createSlice({
  name: 'job',
  initialState,
  reducers: {
    SET_JOB_REQUEST: (state, action: PayloadAction<boolean>) => {
        state.loading = action.payload;
    },
    SET_JOB_ERRORS: (state, action: PayloadAction<{error: string | null, errors: any | null}>) => {
        state.error = action.payload.error;
        state.errors = action.payload.errors;
    },
    SET_RESET_ERROR_JOB: (state) => {
        state.error = null;
        state.errors = null;
    },
    SET_JOBS: (state, action: PayloadAction<JobInterface[]>) => {
        state.jobs = action.payload;
    }
  },
})




// Action creators are generated for each case reducer function
export const { SET_JOB_REQUEST, SET_JOB_ERRORS, SET_RESET_ERROR_JOB, SET_JOBS } = jobSlice.actions;

export const getJobsData = (state: RootState) => state.job.jobs;
export const getJobLoading = (state: RootState) => state.job.loading;

export default jobSlice.reducer

export const jobsMemoized = createSelector(
    [getJobsData], (jobs) => {
        return jobs;
    }
)