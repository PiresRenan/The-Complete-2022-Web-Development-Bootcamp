import React from "react";
import ReactDOM from "react-dom";

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

ReactDOM.render(
  <h1 className="heading" style={customStyle}>
    {greeting}
  </h1>,
  document.getElementById("root")
);
