import { configureStore } from '@reduxjs/toolkit';
import gridRowsReducer from '../features/gridRows/gridRowsSlice';
import gridColsReducer from '../features/gridCols/gridColsSlice';
import gridCellsReducer from '../features/gridCells/gridCellsSlice';
import startCellReducer from '../features/startCell/startCellSlice';
import endCellReducer from '../features/endCell/endCellSlice';
import runningReducer from '../features/running/runningSlice';


export default configureStore({
    reducer: {
        gridRows: gridRowsReducer,
        gridCols: gridColsReducer,
        gridCells: gridCellsReducer,
        startCell: startCellReducer,
        endCell: endCellReducer,
        isRunning: runningReducer,
    }
})