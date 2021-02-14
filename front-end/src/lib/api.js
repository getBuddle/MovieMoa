import axios from "axios";

export const signIn = (data) => {
  return axios.post("/login", data);
};
