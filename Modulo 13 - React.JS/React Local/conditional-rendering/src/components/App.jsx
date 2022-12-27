import React from "react";
import Login from "./Login"

var isLoggedIn = false;

const currentTime = new Date().getHours()

console.log(currentTime);

// function renderConditionally() {
//   if (isLoggedIn === true){
//     return <h1>Hello</h1>
//   }else {
//     return <Login />
//   }
// }

function App() {
  return (
    <div className="container">
      {/* {isLoggedIn ? <h1>Hello</h1> : <Login />} */}
      {/* Jeitin react de fazer duas afirmações */}
      {currentTime > 12 && <h1>Good evening</h1>}
    </div>
  );
}

export default App;
