import axios from "axios";

const api = axios.create({
  baseURL: "https://secure-news.herokuapp.com/api",
});

export function getTopics() {
  return api.get("/topics").then((response) => {
    return response.data.topics;
  });
}

export function getArticles(topic) {
  return api
    .get("/articles", { params: { topic: topic } })
    .then((response) => {
      return response.data.articles
    });
}

export function getArticle(article_id) {
  return api.get(`/articles/${article_id}`)
  .then(response => response.data.article)
}