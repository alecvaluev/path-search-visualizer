import { createSlice } from '@reduxjs/toolkit';

// Slice Object
///////////////////////////////////////
const options = {
    name: 'startCell',
    initialState: {},
    reducers: {
        setStartCell: (state, action) => {
            const { row, col } = action.payload;
            return { row: row, col: col};
        }
    }
}

export const startCellSlice = createSlice(options);

// Selectors
///////////////////////////////////////
export const selectStartCell = (state) => state.startCell;

// Exports
///////////////////////////////////////
export const {
    setStartCell
} = startCellSlice.actions;

export default startCellSlice.reducer;