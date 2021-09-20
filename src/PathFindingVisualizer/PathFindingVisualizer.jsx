import React, { useState, useEffect } from "react";
import Node from "./node/node";
import "./PathFindingVisualizer.css";
import {
  dijkstra,
  getNodesInShortestPathOrderDijkstra,
} from "./algorithm/dijkstra";
import { astar, getNodesInShortestPathOrderAstar } from "./algorithm/astar";
import {
  breadthFirstSearch,
  getNodesInShortestPathOrderBFS,
} from "./algorithm/breadthFirstSearch";

import {
  depthFirstSearch,
  getNodesInShortestPathOrderDFS,
} from "./algorithm/depthFirstSearch";
import {
  greedyBFS,
  getNodesInShortestPathOrderGreedyBFS,
} from "./algorithm/greedyBestFirstSearch";
import {
  bidirectionalGreedySearch,
  getNodesInShortestPathOrderBidirectionalGreedySearch,
} from "./algorithm/bidirectionalGreedySearch";

import { randomMaze } from "./mazeAlgorithms/randomMaze";
import { recursiveDivisionMaze } from "./mazeAlgorithms/recursizeDivision";
import { verticalMaze } from "./mazeAlgorithms/verticalMaze";
import { horizontalMaze } from "./mazeAlgorithms/horizontalMaze";

const initialNum = getInitialNum(window.innerWidth-100, window.innerHeight-100);
const initialNumRows = initialNum[0];
const initialNumColumns = initialNum[1];

const startFinishNode = getStartFinishNode(initialNumRows, initialNumColumns);
const startNodeRow = startFinishNode[0];
const startNodeCol = startFinishNode[1];
const finishNodeRow = startFinishNode[2];
const finishNodeCol = startFinishNode[3];

const PathFindingVisualizer = () => {
  const [grid, setGrid] = useState([]);
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  const [speed, ] = useState(10);
  const [visualizingAlgorithm, setVisualizingAlgorithm] = useState(false);
  const [generatingMaze, setGeneratingMaze] = useState(false);
  const [mazeSpeed, ] = useState(10);
  const [numRows, ] = useState(initialNumRows);
  const [numColumns, ] = useState(initialNumColumns);
  const [currAlgo, setCurrAlgo] = useState("A* algorithm");
  const [maze, setMaze] = useState("Random Maze");
  const [dragStartData, setDragStartData] = useState([startNodeRow, startNodeCol]);
  const [dragEndData, setDragEndData] = useState([finishNodeRow,finishNodeCol])
  const [sNode,setSNode] = useState([startNodeRow,startNodeCol]);
  const [fNode,setFNode] = useState([finishNodeRow,finishNodeCol])
  const [isTarget,setIsTarget]  = useState(false)


  useEffect(() => {
    window.addEventListener("resize", updateDimensions());
    // eslint-disable-next-line
    const newGrid = getInitialGrid(numRows, numColumns);// eslint-disable-next-line
    setGrid(newGrid);
  }, []);

  const updateDimensions = () => {
    setHeight(window.innerHeight);
    setWidth(window.innerWidth);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };
  const handleDragStart = (event, row, col) => {
    if(row === sNode[0] && col === sNode[1]){
      setDragStartData([row, col]);
    }
    else{
      setIsTarget(true)
      setDragEndData([row,col]);
    }
  };

  const handleDrop = (row, col) => {
    const newGrid = grid;
    const temp = newGrid[row][col];
    if(isTarget){
      setFNode([row,col])
      document.getElementById(`node-${row}-${col}`).className = "node node-finish";
      document.getElementById(`node-${dragEndData[0]}-${dragEndData[1]}`).className =
        "node";
        temp.isFinish = true;
    }
    else{
      setSNode([row,col]);
    document.getElementById(`node-${row}-${col}`).className = "node node-start";
    document.getElementById(`node-${dragStartData[0]}-${dragStartData[1]}`).className =
      "node";
      temp.isStart = true;

    }
    
    setIsTarget(false);
    newGrid[row][col] = temp;
    setGrid(newGrid);
  };

  const animateShortestPath = (
    nodesInShortestPathOrder,
    visitedNodesInOrder
  ) => {
    if (nodesInShortestPathOrder.length === 1) {
      setVisualizingAlgorithm(false);
    }
    for (let i = 1; i < nodesInShortestPathOrder.length; i++) {
      if (i === nodesInShortestPathOrder.length - 1) {
        setTimeout(() => {
          let newGrid = updateNodesForRender(
            grid,
            nodesInShortestPathOrder,
            visitedNodesInOrder
          );
          setGrid(newGrid);
          setVisualizingAlgorithm(false);
        }, i * (3 * speed));
        return;
      }
      let node = nodesInShortestPathOrder[i];
      setTimeout(() => {
        //shortest path node
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-shortest-path";
      }, i * (3 * speed));
    }
  };

  const animateAlgorithm = (visitedNodesInOrder, nodesInShortestPathOrder) => {
    let newGrid = grid;
    for (let row of newGrid) {
      for (let node of row) {
        let newNode = {
          ...node,
          isVisited: false,
        };
        newGrid[node.row][node.col] = newNode;
      }
    }
    setGrid(newGrid);
    for (let i = 1; i <= visitedNodesInOrder.length; i++) {
      let node = visitedNodesInOrder[i];
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          animateShortestPath(nodesInShortestPathOrder, visitedNodesInOrder);
        }, i * speed);
        return;
      }
      setTimeout(() => {
        //visited node
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-visited";
      }, i * speed);
    }
  };

  function animateBidirectionalAlgorithm(
    visitedNodesInOrderStart,
    visitedNodesInOrderFinish,
    nodesInShortestPathOrder,
    isShortedPath
  ) {
    let len = Math.max(
      visitedNodesInOrderStart.length,
      visitedNodesInOrderFinish.length
    );
    for (let i = 1; i <= len; i++) {
      let nodeA = visitedNodesInOrderStart[i];
      let nodeB = visitedNodesInOrderFinish[i];
      if (i === visitedNodesInOrderStart.length) {
        setTimeout(() => {
          let visitedNodesInOrder = getVisitedNodesInOrder(
            visitedNodesInOrderStart,
            visitedNodesInOrderFinish
          );
          if (isShortedPath) {
            animateShortestPath(nodesInShortestPathOrder, visitedNodesInOrder);
          } else {
            setVisualizingAlgorithm(true);
          }
        }, i * speed);
        return;
      }
      setTimeout(() => {
        //visited nodes
        if (nodeA !== undefined)
          document.getElementById(`node-${nodeA.row}-${nodeA.col}`).className =
            "node node-visited";
        if (nodeB !== undefined)
          document.getElementById(`node-${nodeB.row}-${nodeB.col}`).className =
            "node node-visited";
      }, i * speed);
    }
  }

  function visualizeDijkstra() {
    if (visualizingAlgorithm || generatingMaze) {
      return;
    }
    setVisualizingAlgorithm(true);
    setTimeout(() => {
      const startNode = grid[sNode[0]][sNode[1]];
      const finishNode = grid[fNode[0]][fNode[1]];
      const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
      const nodesInShortestPathOrder =
        getNodesInShortestPathOrderDijkstra(finishNode);
      animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder);
    }, speed);
  }

  const updateNodesForRender = (
    grid,
    nodesInShortestPathOrder,
    visitedNodesInOrder
  ) => {
    let newGrid = grid.slice();
    for (let node of visitedNodesInOrder) {
      if (
        (node.row === sNode[0] && node.col === sNode[1]) ||
        (node.row === fNode[0] && node.col === fNode[1])
      )
        continue;
      let newNode = {
        ...node,
        isVisited: true,
      };
      newGrid[node.row][node.col] = newNode;
    }
    for (let node of nodesInShortestPathOrder) {
      if (node.row === fNode[0] && node.col === fNode[1]) {
        return newGrid;
      }
      let newNode = {
        ...node,
        isVisited: false,
        isShortest: true,
      };
      newGrid[node.row][node.col] = newNode;
    }
  };

  function visualizeAStar() {
    if (visualizingAlgorithm || generatingMaze) {
      return;
    }
    setVisualizingAlgorithm(true);
    setTimeout(() => {
      const startNode = grid[sNode[0]][sNode[1]];
      const finishNode = grid[fNode[0]][fNode[1]];
      const visitedNodesInOrder = astar(grid, startNode, finishNode);
      const nodesInShortestPathOrder =
        getNodesInShortestPathOrderAstar(finishNode);
      animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder);
    }, speed);
  }

  function visualizeBFS() {
    if (visualizingAlgorithm || generatingMaze) {
      return;
    }
    setVisualizingAlgorithm(true);
    setTimeout(() => {
      const startNode = grid[sNode[0]][sNode[1]];
      const finishNode = grid[fNode[0]][fNode[1]];
      const visitedNodesInOrder = breadthFirstSearch(
        grid,
        startNode,
        finishNode
      );
      const nodesInShortestPathOrder =
        getNodesInShortestPathOrderBFS(finishNode);
      animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder);
    }, speed);
  }

  function visualizeDFS() {
    if (visualizingAlgorithm || generatingMaze) {
      return;
    }
    setVisualizingAlgorithm(true);
    setTimeout(() => {
      const startNode = grid[sNode[0]][sNode[1]];
      const finishNode = grid[fNode[0]][fNode[1]];
      const visitedNodesInOrder = depthFirstSearch(grid, startNode, finishNode);
      const nodesInShortestPathOrder =
        getNodesInShortestPathOrderDFS(finishNode);
      animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder);
    }, speed);
  }

  function visualizeGreedyBFS() {
    if (visualizingAlgorithm || generatingMaze) {
      return;
    }
    setVisualizingAlgorithm(true);
    setTimeout(() => {
      const startNode = grid[sNode[0]][sNode[1]];
      const finishNode = grid[fNode[0]][fNode[1]];
      const visitedNodesInOrder = greedyBFS(grid, startNode, finishNode);
      const nodesInShortestPathOrder =
        getNodesInShortestPathOrderGreedyBFS(finishNode);
      animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder);
    }, speed);
  }

  function visualizeBidirectionalGreedySearch() {
    if (visualizingAlgorithm || generatingMaze) {
      return;
    }
    setVisualizingAlgorithm(true);
    setTimeout(() => {
      const startNode = grid[sNode[0]][sNode[1]];
      const finishNode = grid[fNode[0]][fNode[1]];
      const visitedNodesInOrder = bidirectionalGreedySearch(
        grid,
        startNode,
        finishNode
      );
      const visitedNodesInOrderStart = visitedNodesInOrder[0];
      const visitedNodesInOrderFinish = visitedNodesInOrder[1];
      const isShortedPath = visitedNodesInOrder[2];
      const nodesInShortestPathOrder =
        getNodesInShortestPathOrderBidirectionalGreedySearch(
          visitedNodesInOrderStart[visitedNodesInOrderStart.length - 1],
          visitedNodesInOrderFinish[visitedNodesInOrderFinish.length - 1]
        );
      animateBidirectionalAlgorithm(
        visitedNodesInOrderStart,
        visitedNodesInOrderFinish,
        nodesInShortestPathOrder,
        isShortedPath
      );
    }, speed);
  }

  function clearGrid() {
    if (visualizingAlgorithm || generatingMaze) {
      return;
    }
    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[0].length; col++) {
        if (
          !(
            (row === sNode[0] && col === sNode[1]) ||
            (row === fNode[0] && col === fNode[1])
          )
        ) {
          document.getElementById(`node-${row}-${col}`).className = "node";
        }
      }
    }
    const newGrid = getInitialGrid(numRows, numColumns);
    setVisualizingAlgorithm(false);
    setGeneratingMaze(false);
    setGrid(newGrid);
  }

  const animateMaze = (walls) => {
    for (let i = 0; i <= walls.length; i++) {
      if (i === walls.length) {
        setTimeout(() => {
          clearGrid();
          let newGrid = getNewGridWithMaze(grid, walls);
          setGrid(newGrid);
          setGeneratingMaze(false);
        }, i * mazeSpeed);
        return;
      }
      let wall = walls[i];
      let node = grid[wall[0]][wall[1]];
      setTimeout(() => {
        //Walls
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-wall-animated";
      }, i * mazeSpeed);
    }
  };

  function generateRandomMaze() {
    if (visualizingAlgorithm || generatingMaze) {
      return;
    }
    setGeneratingMaze(true);
    setTimeout(() => {
      const startNode = grid[sNode[0]][sNode[1]];
      const finishNode = grid[fNode[0]][fNode[1]];
      const walls = randomMaze(grid, startNode, finishNode);
      animateMaze(walls);
    }, mazeSpeed);
  }

  function generateRecursiveDivisionMaze() {
    if (visualizingAlgorithm || generatingMaze) {
      return;
    }
    setGeneratingMaze(true);
    setTimeout(() => {
      const startNode = grid[sNode[0]][sNode[1]];
      const finishNode = grid[fNode[0]][fNode[1]];
      const walls = recursiveDivisionMaze(grid, startNode, finishNode);
      animateMaze(walls);
    }, mazeSpeed);
  }

  function generateVerticalMaze() {
    if (visualizingAlgorithm || generatingMaze) {
      return;
    }
    setGeneratingMaze(true);
    setTimeout(() => {
      const startNode = grid[sNode[0]][sNode[1]];
      const finishNode = grid[fNode[0]][fNode[1]];
      const walls = verticalMaze(grid, startNode, finishNode);
      animateMaze(walls);
    }, mazeSpeed);
  }

  function generateHorizontalMaze() {
    if (visualizingAlgorithm || generatingMaze) {
      return;
    }
    setGeneratingMaze(true);
    setTimeout(() => {
      const startNode = grid[sNode[0]][sNode[1]];
      const finishNode = grid[fNode[0]][fNode[1]];
      const walls = horizontalMaze(grid, startNode, finishNode);
      animateMaze(walls);
    }, mazeSpeed);
  }

  const handleAlgoChange = (event) => {
    setCurrAlgo(event.target.value);
  };

  const handleMazeChange = (event) => {
    setMaze(event.target.value);
    console.log(event.target.value);
  };

  const visualizer = () => {
    if (currAlgo === "Dijkstra") visualizeDijkstra();
    else if (currAlgo === "A* algorithm") visualizeAStar();
    else if (currAlgo === "Breadth First Search") visualizeBFS();
    else if (currAlgo === "Depth First Search") visualizeDFS();
    else if (currAlgo === "Greedy BFS") visualizeGreedyBFS();
    else if (currAlgo === "Bidirectional Greedy Search")
      visualizeBidirectionalGreedySearch();
  };
  const generateMaze = () => {
    if (maze === "Random Maze") generateRandomMaze();
    else if (maze === "Recursive Maze") generateRecursiveDivisionMaze();
    else if (maze === "Horizontal Maze") generateHorizontalMaze();
    else if (maze === "Vertical Maze") generateVerticalMaze();
  };


  const getInitialGrid = (numRows, numColumns) => {
    let grid = [];
    for (let row = 0; row < numRows - 3; row++) {
      let currentRow = [];
      for (let col = 0; col < numColumns - 5; col++) {
        currentRow.push(createNode(row, col));
      }
      grid.push(currentRow);
    }
    return grid;
  };
  
  const createNode = (row, col) => {
    return {
      row,
      col,
      isStart: row === sNode[0] && col === sNode[1],
      isFinish: row === fNode[0] && col === fNode[1],
      distance: Infinity,
      totalDistance: Infinity,
      isVisited: false,
      isShortest: false,
      isWall: false,
      previousNode: null,
    };
  };

  return (
    <div className="container-fluid">
      <div className="info-container">
        <div className="box">
        <select onChange={(event) => handleAlgoChange(event)}>
          <option> A* algorithm</option>
          <option>Dijkstra</option>
          <option>Greedy BFS</option>
          <option>Bidirectional Greedy Search</option>
          <hr />
          <option>Depth First Search</option>
          <option>Breadth First Search</option>
        </select>
        </div>
        <button onClick={visualizer} style={{ backgroundColor : "#008000",color : "white", borderColor : "#008000", padding : 8}}>
          VISUALIZER
        </button>
        <button onClick={clearGrid} style={{ backgroundColor : "red",color : "white", borderColor : "red",padding : 8, width: 200 }}>
          CLEAR
        </button>
        <div className="box">
        <select onChange={(event) => handleMazeChange(event)} >
          <option>Random Maze</option>
          <option>Recursive Maze</option>
          <option>Vertical Maze</option>
          <option>Horizontal Maze</option>
        </select>
        </div>
        <button
          type="button"
          style={{ backgroundColor : "#008000",color : "white",borderColor : "#008000", padding : 8, width : 200}}
          onClick={generateMaze}
        >
          GENERATE MAZE
        </button>
      </div>
      <div
        className={
          visualizingAlgorithm || generatingMaze ? "grid-visualizing" : "grid"
        }>
        {grid.map((row, rowId) => {
          return (
            <div key={rowId}>
              {row.map((node, nodeId) => {
                const {
                  row,
                  col,
                  isStart,
                  isFinish,
                  isVisited,
                  isShortest,
                  isWall,
                } = node;
                return (
                  <Node
                    key={nodeId}
                    row={row}
                    col={col}
                    isStart={isStart}
                    isFinish={isFinish}
                    isVisited={isVisited}
                    isShortest={isShortest}
                    isWall={isWall}
                    width={width}
                    height={height}
                    numRows={numRows}
                    numColumns={numColumns}
                    onDragOver={(e) => handleDragOver(e)}
                    onDragStart={(event) => handleDragStart(event, row, col)}
                    onDrop={() => handleDrop(row, col)}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

function getInitialNum(width, height) {
  let numColumns;
  if (width > 1500) {
    numColumns = Math.floor(width / 25);
  } else if (width > 1250) {
    numColumns = Math.floor(width / 22.5);
  } else if (width > 1000) {
    numColumns = Math.floor(width / 20);
  } else if (width > 750) {
    numColumns = Math.floor(width / 17.5);
  } else if (width > 500) {
    numColumns = Math.floor(width / 15);
  } else if (width > 250) {
    numColumns = Math.floor(width / 12.5);
  } else if (width > 0) {
    numColumns = Math.floor(width / 10) - 5;
  }
  let cellWidth = Math.floor(width / numColumns);
  let numRows = Math.floor(height / cellWidth) - 5;
  return [numRows, numColumns];
}



const getNewGridWithMaze = (grid, walls) => {
  let newGrid = grid.slice();
  for (let wall of walls) {
    let node = grid[wall[0]][wall[1]];
    let newNode = {
      ...node,
      isWall: true,
    };
    newGrid[wall[0]][wall[1]] = newNode;
  }
  return newGrid;
};

const getVisitedNodesInOrder = (
  visitedNodesInOrderStart,
  visitedNodesInOrderFinish
) => {
  let visitedNodesInOrder = [];
  let n = Math.max(
    visitedNodesInOrderStart.length,
    visitedNodesInOrderFinish.length
  );
  for (let i = 0; i < n; i++) {
    if (visitedNodesInOrderStart[i] !== undefined) {
      visitedNodesInOrder.push(visitedNodesInOrderStart[i]);
    }
    if (visitedNodesInOrderFinish[i] !== undefined) {
      visitedNodesInOrder.push(visitedNodesInOrderFinish[i]);
    }
  }
  return visitedNodesInOrder;
};

function getRandomNums(num) {
  let randomNums1 = [];
  let temp = 2;
  for (let i = 5; i < num / 2; i += 2) {
    randomNums1.push(temp);
    temp += 2;
  }
  let randomNums2 = [];
  temp = -2;
  for (let i = num / 2; i < num - 5; i += 2) {
    randomNums2.push(temp);
    temp -= 2;
  }
  return [randomNums1, randomNums2];
}

function getStartFinishNode(numRows, numColumns) {
  let randomNums;
  let x;
  let y;
  let startNodeRow;
  let startNodeCol;
  let finishNodeRow;
  let finishNodeCol;
  if (numRows < numColumns) {
    randomNums = getRandomNums(numRows);
    x = Math.floor(numRows / 2);
    y = Math.floor(numColumns / 4);
    if (x % 2 !== 0) x -= 1;
    if (y % 2 !== 0) y += 1;
    startNodeRow =
      x + randomNums[1][Math.floor(Math.random() * randomNums[1].length)];
    startNodeCol = y + [-6, -4, -2, 0][Math.floor(Math.random() * 4)];
    finishNodeRow =
      x + randomNums[0][Math.floor(Math.random() * randomNums[0].length)];
    finishNodeCol =
      numColumns - y + [0, 2, 4, 6][Math.floor(Math.random() * 4)];
  } else {
    randomNums = getRandomNums(numColumns);
    x = Math.floor(numRows / 4);
    y = Math.floor(numColumns / 2);
    if (x % 2 !== 0) x -= 1;
    if (y % 2 !== 0) y += 1;
    startNodeRow = x + [-6, -4, -2, 0][Math.floor(Math.random() * 4)];
    startNodeCol =
      y + randomNums[1][Math.floor(Math.random() * randomNums[1].length)];
    finishNodeRow = numRows - x + [0, 2, 4, 6][Math.floor(Math.random() * 4)];
    finishNodeCol =
      y + randomNums[0][Math.floor(Math.random() * randomNums[0].length)];
  }
  return [startNodeRow, startNodeCol, finishNodeRow, finishNodeCol];
}

export default PathFindingVisualizer;
