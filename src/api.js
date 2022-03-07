import axios from "axios";

const api = axios.create({
  baseURL: "https://secure-news.herokuapp.com/api",
});

export function getTopics() {
  return api.get("/topics").then((response) => {
    return response.data.topics;
  });
}