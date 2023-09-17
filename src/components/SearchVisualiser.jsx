import React, { useEffect } from 'react';
//import components
import Header from './Header';
import { useDispatch } from 'react-redux';

import GridMap from './GridMap';
import { setRows } from '../features/gridRows/gridRowsSlice';
import { setCols } from '../features/gridCols/gridColsSlice';
import { calculateNumRows, calculateNumCols } from './componentsUtils';

export default function Visualiser() {
    const dispatch = useDispatch();

    const screenDimensions = {
          height: window.innerHeight,
          width: window.innerWidth
    };

    useEffect(() => {
        const numRows = calculateNumCols(screenDimensions.height);
        const numCols = calculateNumRows(screenDimensions.width);

        dispatch(setRows(numRows));
        dispatch(setCols(numCols));
    }, []);


    return (
        <div style={{ height: '100vh'}}>
            <Header/>

            {/* main body */}
            <div>
                <GridMap/>
            </div>

        </div>
    )
}