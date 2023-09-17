import { DEBUGGING } from '../../data/constants';
import { getNeighborCells } from '../utils';
/**
 * The function calls general greedy search algorithm with type-astar and returns visited cells
 * @param {array} graph - the array of all cells
 * @param {object} startCell - the start cell
 * @param {object} endCell - the end cell
 * @param {boolean} diagonal - indicates to calculate diagonal cell or not
 */
export const astar = (graph, startCell, endCell, diagonal = false) => {
    return generalGreedyAlgorithm(graph, startCell, endCell, 'astar', diagonal);
} 
/**
 * The function calls general greedy algorithm with type-best first search and returns visited cells
 * @param {array} graph - the array of all cells
 * @param {object} startCell - the start cell
 * @param {object} endCell - the end cell
 * @param {boolean} diagonal - indicates to calculate diagonal cell or not
 */
export const bestFirstSearch = (graph, startCell, endCell, diagonal = false) => {
    return generalGreedyAlgorithm(graph, startCell, endCell, 'bestFirstSearch', diagonal);
}
/**
 * The general greedy function finds 
 * shortest path and returns an array of all visited cells
 * @param {array} graph - the array of all cells
 * @param {object} startCell - the start cell
 * @param {object} endCell - the end cell
 * @param {string} type - the name of the algorithm to use
 * @param {boolean} diagonal - indicates to calculate diagonal cell or not
 */
const generalGreedyAlgorithm = (graph, startCell, endCell, type = 'astar', diagonal = false) => {
    //const graph = JSON.parse(JSON.stringify(graph));
    //set of visited/discovered cells, need to be evaluated
    const openSet = [];
    //already visited and evaluated
    const closedSet = [];

    let currCell = graph[startCell.row][startCell.col];
    openSet.push(currCell);
    if(DEBUGGING) console.log('open', openSet);

    while(openSet.length){
        //the current cell is the cell with the lowest f - totalDistance
        sortByLowestIdx(openSet);
        if(DEBUGGING) console.log('open sorted', openSet);

        currCell = openSet.shift();
        if(DEBUGGING) console.log('cc', currCell.row, currCell.col);
        
        if(currCell.isWall) continue;

        if(currCell.row === endCell.row && currCell.col === endCell.col) return closedSet;
        
        currCell.isVisited = true;
        closedSet.push(currCell);
        if(DEBUGGING) console.log('closed', closedSet);
        updateNeighbors(currCell, endCell, graph, openSet, type, diagonal);
    }
}
/**
 * The function sorts the array by f
 * @param {array} openSet - the array of unvisited cells
 */
const sortByLowestIdx = (openSet) => {
    openSet.sort((cellOne, cellTwo) => {
        return cellOne.f - cellTwo.f;
    });
  }
/**
 * The function calculates and returns a distance
 * by using Euclidean distance formula
 * @param {object} currCell - the current cell 
 * @param {object} endCell - the end cell
 */
const getHeuristic = (currCell, endCell) => {
    const x = Math.abs(endCell.row - currCell.row);
    const y = Math.abs(endCell.col - currCell.col);

    const c = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)); 
    
    return c;
}
/**
 * The function retrieves all unvisited neighbor cells and
 * updates their distance depending of the type  
 * @param {object} currCell - the current cell
 * @param {object} endCell - the end cell
 * @param {array} graph - the array of all cells 
 * @param {array} openSet - the array of unvisited cells 
 * @param {string} type - the name of the algorithm to use 
 * @param {boolean} diagonal - indicates to calculate diagonal cell or not
 */
const updateNeighbors = (currCell, endCell, graph, openSet, type, diagonal) => {
    if(DEBUGGING) console.log('graph', graph);
    const neighborCells = getNeighborCells(currCell, graph, diagonal);
    
    neighborCells.forEach(neighbor => {
        neighbor.fromCell = currCell;
        neighbor.h = getHeuristic(neighbor, endCell);

        const isInOpenSet = openSet.includes(neighbor);

        if(type === 'astar'){
            const calcG = diagonal? currCell.g + 1.4 : currCell.g + 1;  //for diagonal => Math.sqrt(2) ~1.4 
            //is the cell already in the openSet and if it is then update the value
            neighbor.g = (isInOpenSet && calcG < neighbor.g)? calcG : currCell.g + 1;
            neighbor.f = neighbor.g + neighbor.h;
        }
        else if(type === 'bestFirstSearch'){
            neighbor.f = neighbor.h;
        }

        if(!isInOpenSet) openSet.push(neighbor);
    });
    if(DEBUGGING) console.log('neighbors', neighborCells);
}