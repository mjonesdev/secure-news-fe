import React, { useState } from "react";
import Article from "../components/Article";
import CommentsList from "../components/CommentsList";
import ErrorModal from "../components/ErrorModal";

function SingleArticle() {
  const [error, setError] = useState(null);

  return (
    <main>
      <Article error={error} setError={setError} />
      <CommentsList error={error} setError={setError} />
    </main>
  );
}

export default SingleArticle;
