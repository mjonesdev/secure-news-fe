import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getArticle } from "../api";
import ErrorMessage from "./ErrorMessage";
import "./Article.css";

function Article() {
  const [article, setArticle] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { article_id } = useParams();

  useEffect(() => {
    setIsLoading(true);
    getArticle(article_id)
      .then((response) => {
        setArticle(response)
        setIsLoading(false)
      })
      .catch((err) => setError({err}));
  }, []);

  const articleBody = isLoading ? (
    <>Loading...</>
  ) : (
    <article className="article__container">
      <h2 className="article__title">{article.title}</h2>
      <span className="article__author">{article.author}</span>
      <p className="article__body">{article.body}</p>
      <div className="article__details-container">
        <span className="article__votes">Votes: {article.votes}</span>
        <span>{article.created_at.slice(0, 10)}</span>
      </div>
    </article>
  );

  if (error) {
    return <ErrorMessage error={error} />;
  }
  return <div>{articleBody}</div>;
}

export default Article;
