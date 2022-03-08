import React from "react";
import ArticleList from "../components/ArticleList";
import SortAndFilter from "../components/SortAndFilter";

function Articles() {
  return (
    <>
      <SortAndFilter />
      <ArticleList />
    </>
  );
}

export default Articles;
