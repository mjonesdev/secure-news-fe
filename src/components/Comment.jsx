import React, { useState, useEffect } from 'react'
import './Comment.css'
import Likes from './Likes';

function Comment({comment: {author, votes, created_at, body, comment_id}}) {

  const [commentVotes, setCommentVotes] = useState();
  const [likeErr, setLikeErr] = useState(null);


  useEffect(() => {
    setCommentVotes(() => votes)
  }, [])

  return (
    <div className='comment__container'>
        <h3 className='comment__container-header'>{author}</h3>
        <p className='comment__container-body'>{body}</p>
        <Likes setLikeErr={setLikeErr} votes={commentVotes} setVotes={setCommentVotes} id={comment_id}/>
    </div>
  )
}

export default Comment