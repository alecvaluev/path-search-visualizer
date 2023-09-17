import React from 'react';
import { CELL_SIZE } from '../data/constants';
import './animations.css';

export default function Cell({row, col, isStart, isEnd, isWall, isVisited, isShortPath, handleAddWall, handleMouseEnter, handleMouse}){
                                                    
    return (
        <div className={`${!isShortPath && 'border'} border-1 d-inline-block ${isVisited && 'border-light'}
                        ${isStart && !isShortPath? 'startCell': isEnd? 'endCell': null}  
                        ${(isStart || isEnd) && 'startEndAnimation'} 
                        ${isWall && !isStart && !isEnd && 'wallAnimation'}
                        ${isVisited && 'visitedCellsAimation'}
                        ${isShortPath && 'shortPathAnimation'}
                        `} 
            style={{
              width: CELL_SIZE,
              height: CELL_SIZE,
            }}
            onMouseDown={() => handleMouse(row, col, isStart, isEnd)}
            onMouseUp={() => handleMouse(row, col, isStart, isEnd)}
            onMouseEnter={() => handleMouseEnter(row, col, isStart, isEnd)}
            onClick={() => handleAddWall(row, col, true)}
            ></div>
    )
}