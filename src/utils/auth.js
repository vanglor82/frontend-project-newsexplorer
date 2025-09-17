/*global fetch*/

const BASE_URL = process.env.NODE_ENV === "development"
  ? "http://localhost:3000"
  : "https://your-production-url.com";

  function checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  }

export const signup = ({ name, email, password }) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  }).then(checkResponse);
};  

export const signin = ({ email, password }) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);
};

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify({ token }),
  }).then(checkResponse);
};

export { BASE_URL, checkResponse };