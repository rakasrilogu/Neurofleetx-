import React from "react";

function Card({ title, description }) {
  const style = {
    border: "1px solid gray",
    borderRadius: "10px",
    padding: "20px",
    margin: "20px",
    width: "250px",
    display: "inline-block",
    textAlign: "center"
  };
  return (
    <div style={style}>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function CardComponent() {
  return (
    <div style={{ textAlign: "center" }}>
      <Card title="Card 1" description="This is the first card." />
      <Card title="Card 2" description="This is the second card." />
    </div>
  );
}

export default CardComponent;
