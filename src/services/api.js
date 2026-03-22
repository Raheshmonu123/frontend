import axios from "axios";

const API_URL = "http://localhost:8080";

const api = axios.create({
  baseURL: API_URL,
});

export const login = (email, password) =>
  api.post("/auth/login", { email, password });

export const createCard = (card) => api.post("/idcard", card);

export const getCards = () => api.get("/idcards").then((resp) => resp.data);

const apiService = { login, createCard, getCards };
export default apiService;
