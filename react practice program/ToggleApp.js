import React, { useState } from "react";

function ToggleApp() {
  const [isOn, setIsOn] = useState(true);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>{isOn ? "ON" : "OFF"}</h1>
      <button onClick={() => setIsOn(!isOn)}>Toggle</button>
    </div>
  );
}

export default ToggleApp;
