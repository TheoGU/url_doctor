import React from "react";

const Item = ({ state }) => {
  return (
    <div
      style={{
        background: "white",
        width: 350,
        height: 50,
        borderRadius: 25,
        color: "#333",
        padding: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        margin: 10,
      }}
    >
      <p>Status</p>
      <p
        style={{
          color: state === "ok" ? "#00B894" : "#FF7675",
        }}
      >
        {state}
      </p>
      <div
        style={{
          width: 20,
          height: 20,
          borderRadius: 9999,
          background: state === "ok" ? "#00B894" : "#FF7675",
        }}
      />
    </div>
  );
};
export default Item;
