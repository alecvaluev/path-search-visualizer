import { DEBUGGING } from '../../data/constants';
import { getNeighborCells } from '../utils';
/**
 * The function uses dijkastra search algorithm to find the
 * shortest path and returns an array of all visited cells
 * @param {array} graph - the array of all cells
 * @param {object} startCell - the start cell
 * @param {object} endCell - the end cell
 * @param {boolean} diagonal - indicates to calculate diagonal cell or not
 */
export const dijkastra = (graph, startCell, endCell, diagonal = false) => {
    if(DEBUGGING) console.log('start dijkastra')
    if(startCell.row === endCell.row && startCell.col === endCell.col) return;

    let skipedOnce = false;
    let visited = [];
    let unvisited = graph.flat();
    
    const {row, col} = startCell;
    let currCell = graph[row][col];
    currCell.distance = 0;
    visited.push(currCell);

    while(!!unvisited.length){
        if(skipedOnce){
            sortByDistance(unvisited);

            currCell = unvisited.shift();
            if(DEBUGGING) console.log(' currCell', currCell);
        }
        skipedOnce = true;
       
        if(currCell.isWall) continue;
        if(currCell.distance === Infinity) {
            if(DEBUGGING) console.log('infinity')
            return visited;
        }

        currCell.isVisited = true;
        visited.push(currCell);
        updateNeighbors(currCell, graph, diagonal); 

        if(currCell.row === endCell.row && currCell.col === endCell.col) {
            if(DEBUGGING) console.log('finish reached', visited)
            return visited;
        }

        if(DEBUGGING) console.log('new currCell', currCell);
    }
    if(DEBUGGING) console.log('NO SOLUTION');
}
/**
 * The function retrieves all unvisited neighbor cells and
 * updates their distance 
 * @param {object} currCell - the current cell 
 * @param {array} graph - an array of all cells
 * @param {boolean} diagonal - indicates to calculate diagonal cell or not
 */
const updateNeighbors = (currCell, graph, diagonal) => {
    const neighborCells = getNeighborCells(currCell, graph, diagonal);
    neighborCells.forEach(cell => {
        cell.distance = cell.distance + 1;
        cell.fromCell = currCell;
    });
    if(DEBUGGING) console.log('neighbors', neighborCells.map(cell => cell.distance));
}
/**
 * the function sorts the array by distance
 * @param {array} unvisited - the array of unvisited cells 
 */
const sortByDistance = (array) => {
    array.sort((cellOne, cellTwo) => {
        return cellTwo.distance - cellOne.distance
    });
  }