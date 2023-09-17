import { JUMP, DEBUGGING } from '../../data/constants';
/**
 *   The function creates an array with cells for setting and displaying a new maze
 *   @param {number} gridRows - number of rows in the grid 
 *   @param {number} gridCols - number of columns in the grid
 *   @param {object} startCell - the start cell
 *   @param {object} endCell - the end cell
*/
export const createRandomMaze = (gridRows, gridCols, startCell, endCell) => {
    const mazeWalls = [];

    if(DEBUGGING) console.log('start maze');

    let rowIdx = 0, 
        colIdx = 0
    //create maze frame
    while(colIdx < gridCols){
        mazeWalls.push({row: 0, col: colIdx});
        mazeWalls.push({row: gridRows - 1, col: colIdx});
        colIdx++;
    }
    rowIdx++;
    while(rowIdx < gridRows - 1){
        mazeWalls.push({row: rowIdx, col: 0});
        mazeWalls.push({row: rowIdx, col: gridCols - 1});
        rowIdx++;
    }
    if(DEBUGGING) console.log('rc', gridRows, gridCols);

    //choose which direction to start - vertical or horzontal
    const randomDirection = Math.floor(Math.random() * 2);
    //create maze walls inside the maze walls
    createMaze(mazeWalls, 1, gridRows - 2, 1, gridCols - 2, startCell, endCell, randomDirection);
    
    if(DEBUGGING) console.log('end maze', mazeWalls);
    return mazeWalls;
}
/**
 *   The function creates an array with cells for setting and displaying a new maze
 *   @param {array} mazeWalls - an array where to save new walls data
 *   @param {number} startRow - the first row in the grid
 *   @param {number} endRow - the last row in the grid
 *   @param {number} startCol - the first column in the grid
 *   @param {number} endCol - the last column in the grid
 *   @param {object} startCell - the start cell object
 *   @param {object} endCell - the end cell object
 *   @param {boolean} doVerticalWall - default is false - boolean to indicate which wall to draw
 *                           true - for vertical wall
 *                           false - for horizontal wall 
*/
const createMaze = (mazeWalls, startRow, endRow, startCol, endCol, startCell, endCell, doVerticalWall = false) => {
    if(endRow <= startRow + 1 || endCol <= startCol + 1) return;
    //choose random row and col with a gap of 1 between
    let onlyInnerCells = true;
    if(doVerticalWall) onlyInnerCells = false;

    //create arrays with possible rows and columns 
    const randomRows = getNumRange(startRow, endRow, onlyInnerCells); 
    const randomCols = getNumRange(startCol, endCol, !onlyInnerCells);  

    //get random index from the array
    const randomRowNum = Math.floor(Math.random() * randomRows.length);
    const randomColNum = Math.floor(Math.random() * randomCols.length);

    //get the specific row and the column
    const currRow = randomRows[randomRowNum];
    const currCol = randomCols[randomColNum];
    
    const start = doVerticalWall? startRow : startCol;
    const end = doVerticalWall? endRow: endCol;
    createWall(mazeWalls, start, end, currRow, currCol, startCell, endCell, doVerticalWall);
            
    if(DEBUGGING) console.log(startRow, endRow, startCol, endCol, (doVerticalWall)? `vert-${currCol}`: `horz-${currRow}`);
    
    if(doVerticalWall){
        //check if there is more space to create vertical walls
        const verticalSpace = endRow - startRow - 1;
        const leftSpace = currCol - startCol - JUMP;
        const rightSpace = endCol - currRow + JUMP;  

        //create more vertical walls on the left side from the current wall line
        if(leftSpace >= verticalSpace) createMaze(mazeWalls, startRow, endRow, startCol, currCol - JUMP, startCell, endCell, true);
        else createMaze(mazeWalls, startRow, endRow, startCol, currCol - JUMP, startCell, endCell, false);
       
        //create more vertical walls on the right side from the current wall line
        if(rightSpace >= verticalSpace) createMaze(mazeWalls, startRow, endRow, currCol + JUMP, endCol, startCell, endCell, true);
        else createMaze(mazeWalls, startRow, endRow, currCol + JUMP, endCol, startCell, endCell);

    } else {
        //check if there is more space to create horizotal walls
        const horizontalSpace = endRow - startRow - 1;
        const upperSpace = currRow - startRow - JUMP;
        const lowerSpace = endRow - currRow + JUMP;  

        //create more horizontal walls above the current wall line
        if(upperSpace >= horizontalSpace) createMaze(mazeWalls, startRow, currRow - JUMP, startCol, endCol, startCell, endCell, false);
        //or vertical ones
        else createMaze(mazeWalls, startRow, currRow - JUMP, startCol, endCol, startCell, endCell, true);
      
        //create more walls below the current wall line
        if(lowerSpace >= horizontalSpace) createMaze(mazeWalls, currRow + JUMP, endRow, startCol, endCol, startCell, endCell);
        //or horizontal ones
        else createMaze(mazeWalls, currRow + JUMP, endRow, startCol, endCol, startCell, endCell, true);
    }
}
/**
 * The function returns an array of numbers increased by 2
 * @param {number} start - the start of the range
 * @param {number} end - the end of the range
 * @param {boolean} onlyInnerCells - indicate if you need to expand the range by the specified gap
 */
const getNumRange = (start, end, onlyInnerCells = false) => {
    const nums = [];
    const gap = onlyInnerCells ? 1 : 0;

    for(let i = start + gap; i <= end - gap; i += 2){
        nums.push(i);
    }
    return nums;
}
/**
 * The function returns 
 * @param {array} mazeWalls - the array where the walls are saved
 * @param {number} start - the start of the grid - row/col
 * @param {number} end - the end of the grid - row/col
 * @param {number} currRow - the current row
 * @param {number} currCol - the current column
 * @param {object} startCell - the start cell
 * @param {object} endCell - the end cell 
 * @param {boolean} isVertical - indicator to evaluate row or column
 *                               true - for row(vertical wall)
 *                               false - for column(horizontal wall)
 */
const createWall = (mazeWalls, start, end, currRow, currCol, startCell, endCell, isVertical = false) => {
    for(let idx = start; idx <= end; idx++){
        const rowIdx = isVertical? idx : currRow;
        const colIdx = !isVertical? idx : currCol;

        const isTaken = (startCell.row === rowIdx && startCell.col === colIdx) ||
                        (endCell.row === rowIdx && endCell.col === colIdx);
        const checkWall = (isVertical)? (rowIdx !== currRow) : (colIdx !== currCol); 
        
        if(!isTaken && checkWall){
            const wall = {
                row: rowIdx,
                col: colIdx
            }
            mazeWalls.push(wall);
        }
    }
}