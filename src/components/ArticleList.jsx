import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getArticles } from "../api";
import ArticleCard from "./ArticleCard";
import './ArticleList.css'

function ArticleList() {
  const [articles, setArticles] = useState([]);
  const { topic } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getArticles(topic).then((response) => setArticles(response));
    setIsLoading(false);
  }, [topic]);

  const articleList = isLoading ? (
    <p>LOADING</p>
  ) : (
    articles.map((article) => (
      <ArticleCard key={article.article_id} articleDetails={article} />
    ))
  );

  return (
    <>
      <div className="articleList__container">{articleList}</div>
    </>
  );
}

export default ArticleList;
