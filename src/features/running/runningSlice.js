import { createSlice } from '@reduxjs/toolkit';

// Slice Object
///////////////////////////////////////
const options = {
    name: 'isRunning',
    initialState: false,
    reducers: {
        setRunning: (state, action) => {
            /* if(typeof action.payload === 'boolean') {
                console.log('run is set'); */
                return action.payload;
            /* console.warn('wrong type of parameter'); */
        }
    }
}

export const runningSlice = createSlice(options);

// Selectors
///////////////////////////////////////
export const selectRunningState = (state) => state.isRunning;

// Exports
///////////////////////////////////////
export const {
    setRunning
} = runningSlice.actions;

export default runningSlice.reducer;