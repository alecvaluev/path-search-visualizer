import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
//import constants
import { START_CELL_DEFAULT, END_CELL_DEFAULT, DEBUGGING } from '../data/constants';
//import components
import Cell from './Cell';
//import from redux storage
import { selectGridCells, initializeGridCells, addOrDeleteWall, updateStartOrEndCell, selectVisitedExist } from '../features/gridCells/gridCellsSlice';
import { setStartCell, selectStartCell } from '../features/startCell/startCellSlice';
import { setEndCell, selectEndCell } from '../features/endCell/endCellSlice';
import { selectGridRows } from '../features/gridRows/gridRowsSlice';
import { selectGridCols } from '../features/gridCols/gridColsSlice';
import { selectRunningState } from '../features/running/runningSlice';
import { eraseVisitedCells } from './componentsUtils';

export default function GridMap(){
    const dispatch = useDispatch();
    //set mouse, start cell, and end cell states to follow the user
    const [isMouseDown, setIsMouseDown] = useState(false);
    const [isOnStartCell, setIsOnStartCell] = useState(false);
    const [isOnEndCell, setIsOnEndCell] = useState(false);
    
    //retrieve grid cells, rows, cols, start and end cell data
    const gridRows = useSelector(selectGridRows);
    const gridCols = useSelector(selectGridCols);
    const gridCells = useSelector(selectGridCells); 
    const startCell = useSelector(selectStartCell);
    const endCell = useSelector(selectEndCell);
    const isRunning = useSelector(selectRunningState);
    const visitedExist = useSelector(selectVisitedExist);

    if(DEBUGGING) console.log('rows, cols', gridRows, gridCols)
    if(DEBUGGING) console.log('mouse -', isMouseDown)
    if(DEBUGGING) console.log('start -', startCell)
    if(DEBUGGING) console.log('end -', endCell)

    /*
        the function adds new wall cell on the grid
        @param row - row of the cell where the mouse currently is
        @param col - col of the cell where the mouse currently is
    */
    const handleAddWall = (row, col) => {
        const newWall = {
            row: row,
            col: col
        }
        dispatch(addOrDeleteWall(newWall));
    }

    /*
        the function handles mouse state and determine to move start cell/end cell or add more walls
        @param row - row of the cell where the mouse currently is
        @param col - col of the cell where the mouse currently is
        @param isStart - is the current cell the start cell
        @param isEnd - is the current cell the end cell
    */
    const handleMouseEnter = (row, col, isStart, isEnd) => {
        if(isMouseDown && !isRunning){
            if(visitedExist) eraseVisitedCells(dispatch);
            if(isOnStartCell && !isEnd){
                dispatch(updateStartOrEndCell({ row: row, 
                                                col: col, 
                                                prevCell: startCell,
                                                isStart: true }));
                dispatch(setStartCell({row, col}));
            }
            else if(isOnEndCell && !isStart){
                dispatch(updateStartOrEndCell({ row: row, 
                                                col: col, 
                                                prevCell: endCell,
                                                isStart: false }));
                dispatch(setEndCell({row, col}));
            }
            else if (!isOnStartCell && !isOnEndCell && isMouseDown){
                handleAddWall(row, col);
            }
        }
    }
    /*
        the function sets mouse condition and if the mouse is located at start or end cell
        @param row - row of the cell where the mouse currently is
        @param col - col of the cell where the mouse currently is
        @param isStart - is the current cell the start cell
        @param isEnd - is the current cell the end cell
        
     */
    const handleMouse = (row, col, isStart, isEnd) => {
        if(!isRunning){
            if(isStart) setIsOnStartCell(!isOnStartCell);
            else if(isEnd) setIsOnEndCell(!isOnEndCell);
            else handleAddWall(row, col);
        }
    }
    /*
        the function sets the start and end cells as well as creating the grid of cells 
        at first loading
     */
    useEffect(() => {
        const initialGridMap = {
            startCell: START_CELL_DEFAULT,
            endCell: END_CELL_DEFAULT,
            cols: gridCols,
            rows: gridRows
        }
        dispatch(setStartCell(START_CELL_DEFAULT));
        dispatch(setEndCell(END_CELL_DEFAULT));
        dispatch(initializeGridCells(initialGridMap));
    }, [gridRows, gridRows])
    
    return (
        <div onMouseDown={() => setIsMouseDown(true)}
             onMouseUp={() => setIsMouseDown(false)}
             >
        {
            gridCells.map((row, rowIdx) => 
                <div key={rowIdx} style={{lineHeight: 0}}>
                    {
                        row.map((cell, cellIdx) => {
                            const {row, col, isStart, isEnd, isVisited, isShortPath, isWall} = cell;
                            return <Cell key={cellIdx}
                                        row={row}
                                        col={col}
                                        isStart={isStart}
                                        isEnd={isEnd}
                                        isVisited={isVisited}
                                        isShortPath={isShortPath}
                                        isWall={isWall}
                                        handleAddWall={handleAddWall}
                                        handleMouseEnter={handleMouseEnter}
                                        handleMouse={handleMouse}
                                        />
                        })
                    }
                </div>
                )
        }
        </div>
    )
}