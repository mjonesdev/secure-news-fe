import React from "react";
import { Link } from "react-router-dom";
import "./ErrorMessage.css";

function ErrorMessage() {
  return (
    <div className="error__container">
      <h2 className="error__title">
        Oops, something appears to have gone wrong!
      </h2>
      <Link to="/" className="error__home-link">
        <span className="error__home-link--label">Take me home!</span>
      </Link>
    </div>
  );
}

export default ErrorMessage;
