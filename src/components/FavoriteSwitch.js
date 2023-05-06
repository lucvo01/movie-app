import React from "react";
import { FSwitch } from "./form";

function FavoriteSwitch({ name, handleChange }) {
  return <FSwitch name="switch" onChange={handleChange} />;
}

export default FavoriteSwitch;
