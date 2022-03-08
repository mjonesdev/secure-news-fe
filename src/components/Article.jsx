import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'

function Article() {
    const [article, setArticle] = useState({})
    const [isLoading, setIsLoading] = useState(true)
   const {article_id} = useParams()

   useEffect(() => {
       
   }, [])

   const articleBody = isLoading ? <></> : <p>Hello</p>

  return (
    <div>
        {articleBody}
    </div>
  )
}

export default Article