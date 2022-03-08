import React from "react";
import { Link } from "react-router-dom";
import "./ErrorMessage.css";

function ErrorMessage({ error }) {
  const errorMessage = error ? (
    <div className="error__message-container">
      <h5>{error.err.response.status}</h5>
      <span>{error.err.response.data.msg} list</span>
    </div>
  ) : (
    <div>
      <h5>The page you are looking for can not be found.</h5>
    </div>
  );

  return (
    <div className="error__container">
      <h2 className="error__title">
        Oops, something appears to have gone wrong!
      </h2>
      <>{errorMessage}</>
      <Link to="/" className="error__home-link">
        <span className="error__home-link--label">Take me home!</span>
      </Link>
    </div>
  );
}

export default ErrorMessage;
