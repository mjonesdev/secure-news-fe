import React from 'react'

function ArticleDate({dateString}) {

    const dateArr = dateString.slice(0,10).split("-")
    const articleDate = new Date(dateArr[0], dateArr[1], dateArr[2])
    const differenceInDays = Math.floor(Math.abs((new Date() - articleDate)/86400000))
  return (
    <span>Published: {differenceInDays} days ago</span>
  )
}

export default ArticleDate