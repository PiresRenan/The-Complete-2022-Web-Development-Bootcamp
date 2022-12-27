
import React from "react";

function Heading() {
  const date = new Date();
  const currentTime = date.getHours();

  let greeting;

  const customStyle = {
    color: ""
  };

  if (currentTime < 12) {
    greeting = "Bom dia";
    customStyle.color = "red";
  } else if (currentTime < 18) {
    greeting = "Boa Tarde";
    customStyle.color = "green";
  } else {
    greeting = "Boa Noite";
    customStyle.color = "blue";
  }
  return (
    <h1 className="heading" style={customStyle}>{greeting}</h1>)
}

export default Heading;