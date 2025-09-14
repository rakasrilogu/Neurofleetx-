import React, { useState } from "react";

function Calculator() {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [result, setResult] = useState(null);

  const calculateSum = () => {
    setResult(Number(num1) + Number(num2));
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Simple Calculator</h2>
      <input 
        type="number" 
        placeholder="Number 1" 
        value={num1} 
        onChange={(e) => setNum1(e.target.value)}
      />
      <input 
        type="number" 
        placeholder="Number 2" 
        value={num2} 
        onChange={(e) => setNum2(e.target.value)}
      />
      <button onClick={calculateSum}>Add</button>
      {result !== null && <h3>Result: {result}</h3>}
    </div>
  );
}

export default Calculator;
