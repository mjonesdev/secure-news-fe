import React from "react";
import "./ArticleCard.css";
import { Link } from "react-router-dom";

function ArticleCard({ articleDetails: { title, author, votes, created_at, article_id } }) {
  return (
    <Link to={`/article/${article_id}`}>
      <div className="articleCard__container">
        <h5 className="articleCard__text-title">{title}</h5>
        <p className="articleCard__text-author">Author: {author}</p>
        <span className="articleCard__text-sub">Votes: {votes}</span>
        <span className="articleCard__text-sub">
          Published: {created_at.match(/\d\d\d\d-\d\d-\d\d/)}
        </span>
      </div>
    </Link>
  );
}

export default ArticleCard;
