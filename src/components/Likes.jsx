import React from "react";
import { incrementArticle, incrementComment } from "../api";
import { useState } from "react";
import {
  AiFillDislike,
  AiFillLike,
  AiOutlineDislike,
  AiOutlineLike,
} from "react-icons/ai";
import './Likes.css'

function Likes({ setLikeErr, votes, setVotes, id, type }) {
  const [like, setLike] = useState(null);
  const [dislike, setDislike] = useState(null);

  const handleLike = (value) => {
    const incrementFunction = (type === "article") ? incrementArticle : incrementComment
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
        incrementFunction({
          id: id,
          increment: -changeValue,
        }).catch((err) => {
          setVotes((votes) => votes + changeValue);
          setLikeErr("Failed to update likes");
          setFunction(true);
        });
      } else {
        setFunction(true);
        setVotes((votes) => votes + changeValue);
        incrementFunction({ id: id, increment: changeValue })
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
    <span className="likes__container">
      <button
        onClick={() => handleLike("like")}
        className="likes__container-button"
      >
        {likeIcon}
      </button>
      <span className="likes__vote-count">{votes}</span>
      <button
        onClick={() => handleLike("dislike")}
        className="likes__container-dislike-button"
      >
        {dislikeIcon}
      </button>
    </span>
  );
}

export default Likes;
