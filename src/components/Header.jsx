import React  from 'react';
import { useSelector } from 'react-redux';
//import components
import { Button } from './Button'; 
import { PaletteBox } from './PaletteBox';
//import constants
import { DEBUGGING } from '../data/constants';
//import redux storage
import { selectGridCells, selectWallsExist, selectVisitedExist } from '../features/gridCells/gridCellsSlice';
import { selectStartCell } from '../features/startCell/startCellSlice';
import { selectEndCell } from '../features/endCell/endCellSlice';
import { selectRunningState } from '../features/running/runningSlice';
import { selectGridRows } from '../features/gridRows/gridRowsSlice';
import { selectGridCols } from '../features/gridCols/gridColsSlice';

import buttons from '../data/dataStructures';

export default function Header(){
    let gridMap = useSelector(selectGridCells);
    const startCell = useSelector(selectStartCell);
    const endCell = useSelector(selectEndCell);
    const gridRows = useSelector(selectGridRows);
    const gridCols = useSelector(selectGridCols);
    const isRunning = useSelector(selectRunningState);

    const walls = useSelector(selectWallsExist);
    const visited = useSelector(selectVisitedExist);

    if(DEBUGGING) console.log('grid data', walls, visited);
    if(DEBUGGING) console.log('running', isRunning);
    
    const params = {
        gridRows: gridRows,
        gridCols: gridCols,
        gridMap: gridMap,
        startCell: startCell,
        endCell: endCell,
        isRunning: isRunning
    }

    return (
        !isRunning && (
            <div className='position-absolute' style={{zIndex: 1000}}>
        
                <div className=' d-flex justify-content-around p-4 fw-bold'>
                {
                    buttons.map((button, idx) => <Button key={idx} callFunc={button.callFunc} type={button.type} text={button.name} params={params}/>)
                }
                </div>
                <div className='d-flex fw-bold ms-5'>
                    <div className='d-flex px-2'><PaletteBox color={'orange'}/>Start point</div>
                    <div className='d-flex px-2'><PaletteBox color={'blue'}/>End point</div>
                    <div className='d-flex px-2'><PaletteBox color={'#341c02'}/>Walls</div>
                    <div className='d-flex px-2'><PaletteBox color={'#1e88e5'}/>Visited</div>
                    <div className='d-flex px-2'><PaletteBox color={'greenyellow'}/>Short Path</div>
                </div>
            </div>
        )
    )
}