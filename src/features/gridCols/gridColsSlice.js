import { createSlice } from '@reduxjs/toolkit';

// Slice Object
///////////////////////////////////////
const options = {
    name: 'gridCols',
    initialState: 0,
    reducers: {
        setCols: (state, action) => {
           return action.payload;
        }
    }
}

export const gridColsSlice = createSlice(options);

// Selectors
///////////////////////////////////////
export const selectGridCols = (state) => state.gridCols;

// Exports
///////////////////////////////////////
export const {
    setCols
} = gridColsSlice.actions;

export default gridColsSlice.reducer;