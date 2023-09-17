import React, { useState }  from 'react';
import { useDispatch } from 'react-redux';
import { setRunning } from '../features/running/runningSlice';
import { createAnimation, eraseVisitedCells } from './componentsUtils';

export const Button = ({callFunc, type, text, params}) => {
    const dispatch = useDispatch();
    const { gridRows, gridCols, gridMap, startCell, endCell, isRunning} = params;
    const [isHover, setIsHover] = useState(false);
    const btnStyle = {
        backgroundColor: isRunning? null : 'rgba(0, 0, 0, 0.7)',
        borderRadius: '20px',
        cursor: isRunning ? null : "pointer",
        color: isRunning? null : isHover? 
                                'orange': '#fff',
        zIndex: '1000' 
    }

    return (
        <div className={`px-3 py-1 mx-1 border border-2 ${isHover && 'border-warning'}`}
             style={btnStyle}
             onClick={() => {
                 if(!isRunning){
                    dispatch(setRunning(true));
                    eraseVisitedCells(dispatch);
                     
                    if(type === 'algorithm'){
                        createAnimation(dispatch, callFunc, {  gridMap: gridMap, 
                                                                startCell: startCell, 
                                                                endCell: endCell });
                    }else if(type === 'maze'){
                        createAnimation(dispatch, callFunc, { rows: gridRows, 
                                                                cols: gridCols, 
                                                                startCell: startCell, 
                                                                endCell: endCell});
                    }else{
                        callFunc(dispatch);
                    }

                    setTimeout(()=>{
                        dispatch(setRunning(false));
                    }, 10);

                 } else {
                     console.log('Algorithm is crrently running, plz wait...')} 
                 }
             }
             disabled={isRunning}
             onMouseEnter={() => setIsHover(true)}
             onMouseLeave={() => setIsHover(false)}
             >
             {text}</div>
    )
}