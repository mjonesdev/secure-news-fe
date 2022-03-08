import React from "react";
import "./ArticleCard.css";
import { Link } from "react-router-dom";
import ArticleDate from "./ArticleDate";

function ArticleCard({ articleDetails: { title, author, votes, created_at, article_id } }) {
  return (
    <Link to={`/article/${article_id}`}>
      <div className="articleCard__container">
        <h5 className="articleCard__text-title">{title}</h5>
        <p className="articleCard__text-author">Author: {author}</p>
        <span className="articleCard__text-sub">Votes: {votes}</span>
        <span className="articleCard__text-sub">
          <ArticleDate dateString={created_at}/>
        </span>
      </div>
    </Link>
  );
}

export default ArticleCard;
