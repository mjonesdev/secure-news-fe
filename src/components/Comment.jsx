import React, { useState, useEffect, useContext } from "react";
import "./Comment.css";
import Likes from "./Likes";
import { UserContext } from "../contexts/User";
import { RiDeleteBin5Line, RiDeleteBin5Fill } from "react-icons/ri";
import { deleteComment } from "../api";
import ErrorModal from "./ErrorModal";

function Comment({
  comment: { author, votes, created_at, body, comment_id }, setComments, comments}) {
  const [commentVotes, setCommentVotes] = useState();
  const [likeErr, setLikeErr] = useState(null);
  const { user, setUser } = useContext(UserContext);
  const [deleted, setDeleted] = useState(false);
  const [commentDeleteErr, setCommentDeleteErr] = useState(null);

  useEffect(() => {
    setCommentVotes(() => votes);
  }, []);

  const handleDelete = () => {
    setDeleted(true);
    deleteComment(comment_id).then(() => {
      setComments((comments) => {
        return comments.filter(comment => comment.comment_id !== comment_id)
      })
    })
      .catch((err) =>
        setCommentDeleteErr("Unable to delete comment. Please try again.")
      );
  };

  const errorModal = commentDeleteErr ? (
    <ErrorModal setErr={setCommentDeleteErr}>{commentDeleteErr}</ErrorModal>
  ) : null;

  return (
    <div className="comment__container">
      <div className="comment__container-header-container">
        <h3 className="comment__container-header">{author}</h3>
        {author === user ? (
          <>
            {deleted ? (
              <button
                className="comment__container-delete-btn"
              >
                <RiDeleteBin5Fill />
              </button>
            ) : (
              <button
                onClick={handleDelete}
                className="comment__container-delete-btn"
              >
                <RiDeleteBin5Line />
              </button>
            )}
          </>
        ) : null}
      </div>
      <p className="comment__container-body">{body}</p>
      <Likes
        setLikeErr={setLikeErr}
        votes={commentVotes}
        setVotes={setCommentVotes}
        id={comment_id}
      />
      {errorModal}
    </div>
  );
}

export default Comment;
