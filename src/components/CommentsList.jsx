import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getComments } from "../api";
import Comment from "./Comment";
import "./CommentList.css";

function CommentsList() {
  const [comments, setComments] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const { article_id } = useParams();

  useEffect(() => {
    setIsLoading(true);
    getComments(article_id).then((response) => {
      setComments(() => response);
      setIsLoading(() => false);
    });
  }, [article_id]);

  return (
    <section className="comments__container-outer">
      <h3 className="comments__container-header">Comments</h3>
      <div className="comments__container-inner">
        {!isLoading ? (
          comments.map((comment) => {
            return (
              <li key={comment.comment_id} className="comments__container-list-item">
                <Comment comment={comment} />
              </li>
            );
          })
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </section>
  );
}

export default CommentsList;
