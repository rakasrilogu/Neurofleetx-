import React from "react";

function ItemsList() {
  const items = ["Apple", "Banana", "Cherry", "Date"];

  return (
    <div style={{ margin: "50px" }}>
      <h2>Fruits List</h2>
      <ul>
        {items.map((item, index) => <li key={index}>{item}</li>)}
      </ul>
    </div>
  );
}

export default ItemsList;
