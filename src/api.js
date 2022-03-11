import axios from "axios";

const api = axios.create({
  baseURL: "https://secure-news.herokuapp.com/api",
});

export function getTopics() {
  return api.get("/topics").then((response) => {
    return response.data.topics;
  });
}

export function getArticles(topic, order, sort_by) {
  console.log(sort_by)
  return api.get("/articles", { params: { topic: topic, order: order, sorted_by:sort_by } }).then((response) => {
    console.log(response.data.articles)
    return response.data.articles;
  });
}

export function getArticle(article_id) {
  return api
    .get(`/articles/${article_id}`)
    .then((response) => response.data.article);
}

export function incrementArticle(values) {
  return api
    .patch(`/articles/${values.id}`, { inc_votes: values.increment })
    .then((response) => response.data.article);
}

export function getComments(article_id) {
  return api.get(`/articles/${article_id}/comments`).then((response) => {
    return response.data.comments;
  });
}

export function incrementComment(values) {
  return api
    .patch(`/comments/${values.id}`, { inc_votes: values.increment })
    .then((response) => response.data.comment);
}

export function postComment(values) {
  return api
    .post(`/articles/${values.article_id}/comments`, {
      username: values.username,
      body: values.body,
    })
    .then((response) => response.data.comment);
}
