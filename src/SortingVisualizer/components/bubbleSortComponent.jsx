import React from "react";
// import "./component.css"
const BubbleSortComponent = () => {
  return (
    <div className="main-container">
      <div
        className="unsorted"
        style={{
          backgroundColor: "turquoise",
          width: 100,
          textAlign: "center",
          fontWeight : "bold",
          marginBottom : 3,
        }}
      >
        unsorted
      </div>
      <div
        className="comparing"
        style={{
          backgroundColor: "red",
          width: 100,
          textAlign: "center",
          color : "#ccc",
          marginBottom : 3,
          fontWeight : "bold"
        }}
      >
        comparing
      </div>

      <div
        className="swaping"
        style={{
          backgroundColor: "yellow",
          width: 100,
          textAlign: "center",
          marginBottom : 3,
          fontWeight : "bold"
        }}
      >
        swaping
      </div>
      <div
        className="sorted"
        style={{
          backgroundColor: "purple",
          width: 100,
          textAlign: "center",
          color : "#ccc",
          marginBottom : 3,
          fontWeight : "bold"
        }}
      >
        sorted
      </div>
    </div>
  );
};

export default BubbleSortComponent;
