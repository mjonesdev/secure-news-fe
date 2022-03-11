import React, { useState, useContext } from "react";
import { UserContext } from "../contexts/User";
import { postComment } from "../api";
import ErrorModal from "./ErrorModal";
import { BiEnvelopeOpen, BiEnvelope } from "react-icons/bi";
import "./AddComment.css";

function AddComment({
  article_id,
  error,
  setError,
  setCommentMade,
  commentMade,
}) {
  const [commentText, setCommentText] = useState("");
  const { user, setUser } = useContext(UserContext);
  const [postError, setPostError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (commentText !== "") {
      setCommentMade(() => true);
      postComment({ username: user, body: commentText, article_id: article_id }).then(response => setCommentMade(false))
        .catch((err) => {
          setPostError(() => "Unable to post comment. Please try again");
          setCommentMade(() => false)
        });
      setCommentText(() => "");
    }
  };
  const buttonContent = commentMade ? (
    <BiEnvelope />
  ) : (
    <>
      <BiEnvelopeOpen /> Post
    </>
  );

  return (
    <>
      <form className="addComment__container">
        <textarea
          className="addComment__container-textarea"
          id="comment"
          name="comment"
          rows="4"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <button onClick={(e) => handleSubmit(e)} className="addComment__container-post">
          {buttonContent}
        </button>
      </form>
      {postError ? (
        <ErrorModal setErr={setPostError}>{postError}</ErrorModal>
      ) : null}
    </>
  );
}

export default AddComment;
