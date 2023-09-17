import { getNeighborCells } from '../utils';
/**
 * The function uses breadth first search algorithm to find the
 * shortest path and returns an array of all visited cells
 * @param {array} graph - the array of all cells in the grid 
 * @param {object} startCell - the start cell
 * @param {object} endCell - the end cell
 */
export const breadthFirstSearch = (graph, startCell, endCell) => {
    const visited = [];
    const unvisited = [];

    let currCell = graph[startCell.row][startCell.col];
    unvisited.push(currCell);

    while(unvisited.length){
        let currCell = unvisited.shift();

        if(currCell.isWall) continue;
        
        currCell.isVisited = true;
        visited.push(currCell);
        if(currCell.row === endCell.row && currCell.col === endCell.col) return visited;
        updateNeighbors(currCell, graph, unvisited);
    }
}
/**
 * The function retrieves all unvisited neighbor cells and
 * adds them to unvisited
 * @param {object} currCell - the current cell 
 * @param {array} graph - an array of all cells
 * @param {arrya} unvisited - the array of unvisited cells
 */
const updateNeighbors = (currCell, graph, unvisited) => {
    const neighborCells = getNeighborCells(currCell, graph);
    
    neighborCells.forEach(neighbor => {
        neighbor.fromCell = currCell;
        const isInside = unvisited.includes(neighbor);
        if(!isInside) unvisited.push(neighbor);
    });
}