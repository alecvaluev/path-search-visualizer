import { dijkastra } from '../algorithms/pathsearch-algorithms/dijkastra';
import { astar } from '../algorithms/pathsearch-algorithms/greedy';
import { bestFirstSearch } from '../algorithms/pathsearch-algorithms/greedy';
import { createObstacleMaze } from '../algorithms/maze-algorithms/obstacleMaze';
import { createRandomMaze } from '../algorithms/maze-algorithms/maze';
import { eraseWalls, eraseVisitedCells } from '../components/componentsUtils';
import { breadthFirstSearch } from '../algorithms/pathsearch-algorithms/BFS';

/**
 * The array of buttons with their names and functions to call
 */
export default [
  {
    name: 'Erase Walls',
    callFunc: eraseWalls
  },
  {
    name: 'Clear Algorithm',
    callFunc: eraseVisitedCells
  },
  {
    name: 'Create Obstacles',
    callFunc: createObstacleMaze,
    type: 'maze'
  },
  {
    name: 'Create Maze',
    callFunc: createRandomMaze,
    type: 'maze'
  },
  {
    name: 'Dijkastra',
    callFunc: dijkastra,
    type: 'algorithm'
  },
  {
    name: 'Astar',
    callFunc: astar,
    type: 'algorithm'
  },
  {
    name: 'Best First Search',
    callFunc: bestFirstSearch,
    type: 'algorithm'
  },
  {
    name: 'Breadth First Search',
    callFunc: breadthFirstSearch,
    type: 'algorithm'
  }
]