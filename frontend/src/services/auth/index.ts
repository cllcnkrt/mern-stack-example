import axios from "axios";

import { AuthModel } from "./AuthModel";

const API_URL = "/api/users/";

//Register
export const authService = {
  register: async (payload: AuthModel.Auth.RegisterRequest) => {
    const response = await axios.post(API_URL, payload);

    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }

    return response.data;
  },

  //Login
  login: async (payload: AuthModel.Auth.LoginRequest) => {
    const response = await axios.post(API_URL + "login", payload);

    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }

    return response.data;
  },

  logout: async () => {
    localStorage.removeItem("user");
  },
};
