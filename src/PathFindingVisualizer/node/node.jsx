import React from "react";
import "./node.css";

const Node = (props) => {
  const {
    row,
    col,
    isStart,
    isFinish,
    isWall,
    isVisited,
    isShortest,
    width,
    height,
    numRows,
    numColumns,
    onDragStart,
    onDragOver,
    onDrop
  } = props;

  const extraClass = isStart
    ? "node node-start"
    : isFinish
    ? "node node-finish"
    : isWall
    ? "node-wall"
    : isShortest
    ? "node node-shortest-path"
    : isVisited
    ? "node node-visited"
    : "node";



    const isPlace = isStart || isFinish;
  const block = () => {
    if (isPlace) {
      return (
        <div
          id={`node-${row}-${col}`}
          draggable
          onDragStart={(event)=>onDragStart(event)}
          className={`${extraClass}`}
          style={{ "--width": `${cellWidth}px`, "--height": `${cellHeight}px` }}
        ></div>
      );
    } else {
      return (
        <div
          id={`node-${row}-${col}`}
          onDragOver={(e)=>onDragOver(e)}
          onDrop={()=>onDrop()}
          className={`node ${extraClass}`}
          style={{ "--width": `${cellWidth}px`, "--height": `${cellHeight}px` }}
          
        ></div>
      )
    }
  }


    let cellWidth = Math.floor((width - 15) / numColumns);
    let cellHeight;
    if (width > 1500) {
      cellHeight = Math.floor((height - 70) / numRows);
    } else if (width > 1000) {
      cellHeight = Math.floor((height - 70) / numRows);
    } else if (width > 500) {
      cellHeight = Math.floor((height - 60) / numRows);
    } else if (width > 0) {
      cellHeight = Math.floor((height - 50) / numRows);
    }

    return (
        <>
        {block()}
        </>
         
       
      );
};

export default Node;
