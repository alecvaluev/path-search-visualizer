/**
 * The function finds the neighbors of the chosen cell
 * and returns all unvisited neighbors
 * @param {object} cell - the current cell, whose neighbors to find
 * @param {array} graph - the array of all cells 
 * @param {boolean} diagonal - indicates to calculate diagonal cell or not
 */
export const getNeighborCells = (cell, graph, diagonal = false) =>{
    const neighbors = [];
    const {row, col} = cell;
    //add all 4 cells around the current one
    if(row > 0) neighbors.push(graph[row - 1][col]);
    if(col < graph[0].length - 1) neighbors.push(graph[row][col + 1]);
    if(row < graph.length - 1) neighbors.push(graph[row + 1][col]);
    if(col > 0) neighbors.push(graph[row][col - 1]);
    
    if(diagonal){
        if(row > 0 && col < graph.length - 1) neighbors.push(graph[row - 1][col + 1]);
        if(row < graph.length - 1 && col < graph.length - 1) neighbors.push(graph[row + 1][col + 1]);
        if(row < graph.length - 1 && col > 0) neighbors.push(graph[row + 1][col - 1]);
        if(row > 0 && col > 0) neighbors.push(graph[row - 1][col - 1]);
    }
    //return only cells that have not been visited
    return neighbors.filter(cell => !cell.isVisited);
}
/**
 * The function uses the end cell to track how it was 
 * reached and returns the path reversed
 * @param {object} endCell - the end cell
 */
export const createShortPath = (endCell) => {
    const shortPath = [];
    let currCell = endCell;
    while(currCell.fromCell !== null){
        console.log('cc', currCell, currCell.fromCell)
        shortPath.push(currCell);
        currCell = currCell.fromCell;
    }
    return shortPath.reverse();
}
/**
 * The function traverse the array and returns 
 * true/false if the object provided is inside of
 * the array
 * @param {array} array - the array to traverse 
 * @param {object} obj - the object to compare
 */
export const arrayIncludesDeep = (array, obj) => {
    const {row, col} = obj;
    for(const obj of array){
        if(obj.row === row && obj.col === col) return true;
    }
    return false;
}