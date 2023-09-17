import { DEBUGGING, CELL_SIZE } from '../data/constants';
import { addShortPathCell, addVisitedCell, addOrDeleteWall, clearWallsOnGrid, resetCellsValues, clearVisitedCells, clearShortPathCells } from "../features/gridCells/gridCellsSlice";
import { createShortPath } from '../algorithms/utils';
/*
    the function calcuates the number of rows to display
    @param screenWidth - current width of the screen
*/
export const calculateNumRows = (screenWidth) => {
    return Math.floor(screenWidth / CELL_SIZE);
}

/*
    the function calculates the number of columns to display
    @param screenHeight - current height of the screen
*/
export const calculateNumCols = (screenHeight) => {
    return Math.floor(screenHeight / CELL_SIZE);
}

export const createAnimation = (dispatch, callFunc, funcParams) => {
    //use rows to determine which type of algorithm to call - maze or search

    if(funcParams.rows === undefined){
       //start search algorithm
        if(DEBUGGING) console.log('starting algorithm');
        
        const {gridMap, startCell, endCell} = funcParams;
        
        const graphCopy = JSON.parse(JSON.stringify(gridMap));
        //clean the copy from visited cells
        graphCopy.forEach(row => row.forEach(cell => {
            if(cell.isVisited) cell.isVisited = false;
            if(cell.isShortPath) cell.isShortPath = false;
        }))
        const visitedCells = callFunc(graphCopy, startCell, endCell);
        
        if(DEBUGGING) console.log('visited cells', visitedCells);
        
        for(const cell of visitedCells){
            setTimeout(()=>{
                dispatch(addVisitedCell(cell));
            }, 10)
        }
        const lastCell = visitedCells[visitedCells.length - 1];
        const shortPath = createShortPath(lastCell);
        for(const cell of shortPath){
            setTimeout(()=>{
                dispatch(addShortPathCell(cell));
            }, 10)
        }
    }
    else{
        //create maze
        dispatch(clearWallsOnGrid());
        const {rows, cols, startCell, endCell} = funcParams;
        const mazeWalls = callFunc(rows, cols, startCell, endCell);
        for(const wall of mazeWalls){
            setTimeout(()=>{
                dispatch(addOrDeleteWall(wall));
            }, 0.0005)
        }
    }
}

export const eraseWalls = (dispatch) => {
    dispatch(clearWallsOnGrid());
}

export const eraseVisitedCells = (dispatch) =>{
    dispatch(resetCellsValues());
    dispatch(clearShortPathCells());
    dispatch(clearVisitedCells());
}