import { createSlice } from '@reduxjs/toolkit';

// Slice Object
///////////////////////////////////////
const options = {
    name: 'gridRows',
    initialState: 0,
    reducers: {
        setRows: (state, action) => {
           return action.payload;
        }
    }
}

export const gridRowsSlice = createSlice(options);

// Selectors
///////////////////////////////////////
export const selectGridRows = (state) => state.gridRows;

// Exports
///////////////////////////////////////
export const {
    setRows
} = gridRowsSlice.actions;

export default gridRowsSlice.reducer;