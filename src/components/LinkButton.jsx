import React from "react";
import { Link } from "react-router-dom";
import "./LinkButton.css";

function LinkButton({ buttonType }) {
    const linkAddress = buttonType === "Account" ? "/user" : "/articles"
  return (
    <Link to={linkAddress} className="linkButton__container">
      <div>{buttonType}</div>
    </Link>
  );
}

export default LinkButton;
