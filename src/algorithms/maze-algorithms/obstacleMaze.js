import { DEBUGGING } from '../../data/constants';
import { arrayIncludesDeep } from '../utils';
/**
 * The function returns an array of randomly generated walls
 * @param {number} rows - the number of rows of the grid 
 * @param {number} cols - the number of columns of the grid
 * @param {object} starCell - the start cell
 * @param {object} endCell - the end cell
 * @param {number} difficultyLevel - coefficient of how many cells to use 
 */
export const createObstacleMaze = (rows, cols, starCell, endCell, difficultyLevel = 0.3) => {
    const obstacles = [];
    let numObstacles = Math.floor((rows * cols - 2) * difficultyLevel);

    if(DEBUGGING) console.log(numObstacles);

    while(numObstacles > 0){
        numObstacles--;

        const row = Math.floor(Math.random() * rows);
        const col = Math.floor(Math.random() * cols);
        
        const wall = {
            row: row,
            col: col
        }
        //check to avoid start & end cells
        if( row !== starCell.row && col !== starCell.col && 
            row !== endCell.row && col !== endCell.col &&
            !arrayIncludesDeep(obstacles, wall)) {
                obstacles.push({ row: row, col: col});
            }
    }

    if(DEBUGGING) console.log(obstacles);
    return obstacles;
}