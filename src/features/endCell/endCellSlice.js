import { createSlice } from '@reduxjs/toolkit';

// Slice Object
///////////////////////////////////////
const options = {
    name: 'endCell',
    initialState: {},
    reducers: {
        setEndCell: (state, action) => {
            const { row, col } = action.payload;
            return { row: row, col: col};
        }
    }
}

export const endCellSlice = createSlice(options);

// Selectors
///////////////////////////////////////
export const selectEndCell = (state) => state.endCell;

// Exports
///////////////////////////////////////
export const {
    setEndCell
} = endCellSlice.actions;

export default endCellSlice.reducer;