import React, { useState } from "react";

function ColorChanger() {
  const [color, setColor] = useState("red");

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1 style={{ color }}>Change my color!</h1>
      <button onClick={() => setColor("red")}>Red</button>
      <button onClick={() => setColor("green")}>Green</button>
      <button onClick={() => setColor("blue")}>Blue</button>
    </div>
  );
}

export default ColorChanger;
