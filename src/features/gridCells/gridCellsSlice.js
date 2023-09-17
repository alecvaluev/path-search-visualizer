import { createSlice } from '@reduxjs/toolkit';

// Slice Object
///////////////////////////////////////
const options = {
    name: 'gridCells',
    initialState: [],
    reducers: {
        initializeGridCells: (state, action) => {
            const { startCell, endCell, rows, cols } = action.payload;

            //create empty rows
            let grid = [];
            for(let rowIdx = 0; rowIdx < rows; rowIdx++){
                let row = [];
                
                for(let colIdx = 0; colIdx < cols; colIdx++){
                    
                    let currCell = {
                        row: rowIdx,
                        col: colIdx,
                        isStart: rowIdx === startCell.row && colIdx === startCell.col,
                        isEnd: rowIdx === endCell.row && colIdx === endCell.col,
                        isWall: false,
                        isVisited: false,
                        isShortPath: false,
                        distance: Infinity,
                        f: 0,
                        g: 0,
                        h: 0,
                        fromCell: null
                    }
                    row.push(currCell);
                }
                grid.push(row);
            }
            return grid;
        },
        addOrDeleteWall: (state, action) => {
            const {row, col} = action.payload;
            if(!state[row][col].isVisited) state[row][col].isWall = !state[row][col].isWall;
        },
        updateStartOrEndCell: (state, action) => {
            const {row, col, prevCell, isStart} = action.payload;

            if(isStart){
                state[prevCell.row][prevCell.col].isStart = false;
                state[row][col].isStart = true;
            }
            else{
                state[prevCell.row][prevCell.col].isEnd = false;
                state[row][col].isEnd = true;
            }
        },
        addVisitedCell: (state, action) => {
            const {row, col} = action.payload;
            state[row][col].isVisited = true;
        },
        clearVisitedCells: (state, action) => {
            state.forEach(row => row.forEach(cell => (cell.isVisited)? cell.isVisited = !cell.isVisited : null));
        },
        addShortPathCell: (state, action) => {
            const {row, col} = action.payload;
            state[row][col].isShortPath = true;
        },
        clearShortPathCells: (state, action) => {
            state.forEach(row => row.forEach(cell => (cell.isShortPath)? cell.isShortPath = !cell.isShortPath : null));
        },
        clearWallsOnGrid: (state, action) => {
            state.forEach(row => row.forEach(cell => (cell.isWall)? cell.isWall = !cell.isWall : null));
        },
        resetCellsValues: (state, action) => {
            state.forEach(row => row.forEach(cell => {
                cell.distance = Infinity;
                cell.f = 0;
                cell.h = 0;
                cell.g = 0;
                cell.fromCell = null;
            }))
        },
        resetCells: (state, action) => {
            state.forEach(row => row.forEach(cell => {
                cell.isWall = false;
                cell.isVisited = false;
                cell.isShortPath = false;
                cell.distance = Infinity;
                cell.f = 0;
                cell.g = 0;
                cell.h = 0;
                cell.fromCell = null;
            }))
        }
    }
}

export const gridCellsSlice = createSlice(options);

// Selectors
///////////////////////////////////////
export const selectGridCells = (state) => state.gridCells;
//for visited cells
export const selectVisitedCells = (state) => state.gridCells.flat().filter(cell => cell.isVisited);
export const selectVisitedExist = (state) => state.gridCells.flat().some(cell => cell.isVisited);
//for wall cells
export const selectWallCells = (state) => state.gridCells.flat().filter(cell => cell.isWall);
export const selectWallsExist = (state) => state.gridCells.flat().some(cell => cell.isWall);

// Exports
///////////////////////////////////////
export const {
    initializeGridCells,
    addOrDeleteWall,
    updateStartOrEndCell,
    addVisitedCell,
    clearVisitedCells,
    addShortPathCell,
    clearShortPathCells,
    clearWallsOnGrid,
    resetCellsValues,
    resetCells
} = gridCellsSlice.actions;

export default gridCellsSlice.reducer;