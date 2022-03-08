import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getArticles } from "../api";
import ArticleCard from "./ArticleCard";
import "./ArticleList.css";
import ErrorMessage from "./ErrorMessage";

function ArticleList() {
  const [articles, setArticles] = useState([]);
  const { topic } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    getArticles(topic)
      .then((response) => setArticles(response))
      .catch((err) => {
        setError({ err });
      });
    setIsLoading(false);
  }, [topic]);

  const articleList = isLoading ? (
    <p>LOADING</p>
  ) : (
    articles.map((article) => (
      <ArticleCard key={article.article_id} articleDetails={article} />
    ))
  );
  if (error) {
    return <ErrorMessage error={error} />;
  }
  return (
    <>
      <div className="articleList__container">{articleList}</div>
    </>
  );
}

export default ArticleList;
