import React from "react";
// import "./component.css"
const MergeSortComponent = () => {
  return (
    <div className="main-container">
      <div
        className="swaping"
        style={{
          backgroundColor: "yellow",
          width: 100,
          textAlign: "center",
          marginBottom : 3,
          marginTop : 5,
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

export default MergeSortComponent;
