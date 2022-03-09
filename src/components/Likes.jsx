import React from "react";
import { incrementArticle } from "../api";
import { useState } from "react";
import {
  AiFillDislike,
  AiFillLike,
  AiOutlineDislike,
  AiOutlineLike,
} from "react-icons/ai";

function Likes({ setLikeErr, votes, setVotes, article_id }) {
  const [like, setLike] = useState(null);
  const [dislike, setDislike] = useState(null);

  const handleLike = (value) => {
    let setFunction = setLike;
    let comparisonValue = dislike;
    let changeValue = 1;
    let currentCheck = like;
    if (value === "dislike") {
      setFunction = setDislike;
      comparisonValue = like;
      changeValue = -1;
      currentCheck = dislike;
    }
    if (comparisonValue === false || comparisonValue === null) {
      if (currentCheck === true) {
        setFunction(false);
        setVotes((votes) => votes - changeValue);
        incrementArticle({
          article_id: article_id,
          increment: -changeValue,
        }).catch((err) => {
          setVotes((votes) => votes + changeValue);
          setLikeErr("Failed to update likes");
          setFunction(true);
        });
      } else {
        setFunction(true);
        setVotes((votes) => votes + changeValue);
        incrementArticle({ article_id: article_id, increment: changeValue })
          .then((response) => setVotes(response.votes))
          .catch((err) => {
            setVotes((votes) => votes - changeValue);
            setLikeErr("Failed to update likes");
            setFunction(false);
          });
      }
    }
  };
  
  const likeIcon = like ? <AiFillLike /> : <AiOutlineLike />;
  const dislikeIcon = dislike ? <AiFillDislike /> : <AiOutlineDislike />;

  return (
    <span className="article__likes">
      <button
        onClick={() => handleLike("like")}
        className="article__like-button"
      >
        {likeIcon}
      </button>
      <span className="article__vote-count">{votes}</span>
      <button
        onClick={() => handleLike("dislike")}
        className="article__dislike-button"
      >
        {dislikeIcon}
      </button>
    </span>
  );
}

export default Likes;
