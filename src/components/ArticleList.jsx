import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getArticles } from "../api";
import ArticleCard from "./ArticleCard";
import "./ArticleList.css";
import ErrorMessage from "./ErrorMessage";

function ArticleList() {
  const [articles, setArticles] = useState([]);
  const { topic } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const search = useLocation().search

  useEffect(() => {
    const order = new URLSearchParams(search).get('order');
    const sort_by = new URLSearchParams(search).get("sort_by")
    setIsLoading(true);
    setError(null);
    getArticles(topic, order, sort_by)
      .then((response) => setArticles(response))
      .catch((err) => {
        setError({ err });
      });
    setIsLoading(false);
  }, [topic, search]);

  if (error) {
    return <ErrorMessage error={error} />;
  }
  return (
    <>
      <div className="articleList__container">
        {isLoading ? (
          <p>LOADING</p>
        ) : (
          <ul>
            {articles.map((article) => (
              <li className="articleList__container-list-item" key={article.article_id}>
                <ArticleCard articleDetails={article} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default ArticleList;
