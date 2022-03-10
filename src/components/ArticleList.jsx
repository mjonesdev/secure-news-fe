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
