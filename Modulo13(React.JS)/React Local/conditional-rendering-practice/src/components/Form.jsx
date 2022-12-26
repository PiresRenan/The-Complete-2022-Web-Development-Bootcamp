import React from "react";
import Input from "./Input";

export default function Form(props) {
  return (
    <form className="form">
      <Input type="text" placeholder="Username"/>
      <Input type="password" placeholder="Password"/>
      {!props.isRegistered && <input type="password" placeholder="Confirm Password" />}
      <button type="submit">{ props.isRegistered ? "Login" : "Register" }</button>
    </form>
  );
}