import React from "react";
import Article from "../components/Article";
import CommentsList from "../components/CommentsList";

function SingleArticle() {
  return (
    <main>
      <Article />
      <CommentsList />
    </main>
  );
}

export default SingleArticle;
