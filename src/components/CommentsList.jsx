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

  const commentCards = !isLoading ? (
    comments.map((comment) => {
      return <Comment key={comment.comment_id} comment={comment} />;
    })
  ) : (
    <p>Loading...</p>
  );

  return (
    <section className="comments__container-outer">
      <h3 className="comments__container-header">Comments</h3>
      <div className="comments__container-inner">
        {commentCards}
      </div>
    </section>
  );
}

export default CommentsList;
