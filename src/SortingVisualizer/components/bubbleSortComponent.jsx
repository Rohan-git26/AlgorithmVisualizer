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
          marginTop : 5,
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

     
    </div>
  );
};

export default BubbleSortComponent;
