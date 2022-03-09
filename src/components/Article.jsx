import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getArticle } from "../api";
import ErrorMessage from "./ErrorMessage";
import ArticleDate from "./ArticleDate";
import "./Article.css";
import Likes from "./Likes";
import ErrorModal from "./ErrorModal";

function Article() {
  const [article, setArticle] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [votes, setVotes] = useState();
  const [likeErr, setLikeErr] = useState(null);

  const { article_id } = useParams();

  useEffect(() => {
    setIsLoading(true);
    getArticle(article_id)
      .then((response) => {
        setError(null);
        setArticle(response);
        setIsLoading(false);
        setVotes(response.votes);
      })
      .catch((err) => setError({ err }));
  }, []);

  const articleBody = isLoading ? (
    <>Loading...</>
  ) : (
    <main className="article__container">
      <h2 className="article__title">{article.title}</h2>
      <span className="article__author">{article.author}</span>
      <p className="article__body">{article.body}</p>
      <div className="article__details-container">
        <Likes
          setLikeErr={setLikeErr}
          votes={votes}
          setVotes={setVotes}
          article_id={article.article_id}
        />
        <ArticleDate dateString={article.created_at} />
      </div>
    </main>
  );
  const errorModal = likeErr ? <ErrorModal setLikeErr={setLikeErr}>{likeErr}</ErrorModal> : null;
  if (error) {
    return <ErrorMessage error={error} />;
  }
  return <div>
    {articleBody}
    {errorModal}
    </div>;
}

export default Article;
