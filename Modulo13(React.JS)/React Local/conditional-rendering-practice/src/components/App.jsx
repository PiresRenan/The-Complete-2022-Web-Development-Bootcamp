import React from "react";
import Form from "./Form";

var userIsRegistered = false;

export default function App() {
  return (
    <div className="container">
      <Form isRegistered={userIsRegistered} />
    </div>
  );
}

