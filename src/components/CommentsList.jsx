import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getComments } from "../api";
import AddComment from "./AddComment";
import Comment from "./Comment";
import "./CommentList.css";

function CommentsList({error, setError}) {
  const [comments, setComments] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [commentMade, setCommentMade] = useState(false)

  const { article_id } = useParams();

  useEffect(() => {
    getComments(article_id).then((response) => {
      setComments(() => response);
      setIsLoading(() => false);
    });
  }, [article_id, commentMade]);

  return (
    <section className="comments__container-outer">
      <h3 className="comments__container-header">Comments</h3>
      <div className="comments__container-inner">
        {!isLoading ? (
          comments.map((comment) => {
            return (
              <li key={comment.comment_id} className="comments__container-list-item">
                <Comment comment={comment} setComments={setComments} comments={comments} />
              </li>
            );
          })
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <div>
          <AddComment article_id={article_id} error={error} setError={setError} setCommentMade={setCommentMade} commentMade={commentMade} />
      </div>
    </section>
  );
}

export default CommentsList;
