import React from "react";
import { incrementArticle, incrementComment } from "../api";
import { useState } from "react";
import {
  AiFillDislike,
  AiFillLike,
  AiOutlineDislike,
  AiOutlineLike,
} from "react-icons/ai";
import "./Likes.css";

function Likes({ setLikeErr, votes, setVotes, id, type }) {
  const [like, setLike] = useState(0);

  const handleLike = (value) => {
    const incrementFunction =
      type === "article" ? incrementArticle : incrementComment;
    if (like === 0 && (value === 1 || value === -1) ) {
      setLike(() => value)
      setVotes((votes) => votes + value)
      incrementFunction({id:id, increment: value})
      .catch(err => {
        setVotes((votes) => votes - value)
        setLikeErr("Failed to update likes");
        setLike((like) => like - value)
      })
    } else if (like === value) {
      setLike(() => 0)
      setVotes((votes) => votes - value)
      incrementFunction({id:id, increment: -value })
      .catch(err => {
        setVotes((votes) => votes + value)
        setLikeErr("Failed to update likes");
        setLike((like) => like + value)
      })
    }
    
  };

  return (
    <span className="likes__container">
      <button
        onClick={() => handleLike(1)}
        className="likes__container-button"
      >
        {like === 1 ? <AiFillLike /> : <AiOutlineLike />}
      </button>
      <span className="likes__vote-count">{votes}</span>
      <button
        onClick={() => handleLike(-1)}
        className="likes__container-dislike-button"
      >
        {like === -1 ? <AiFillDislike /> : <AiOutlineDislike />}
      </button>
    </span>
  );
}

export default Likes;
