import axios from "axios";

import { IAuth } from "../../redux/slices/auth/Auth";

const API_URL = "/api/users/";

//Register

export const authService = {
  register: async (userData: IAuth.RegisterPayload) => {
    const response = await axios.post(API_URL, userData);

    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }

    return response.data;
  },

  //Login
  login: async (userData: IAuth.LoginPayload) => {
    const response = await axios.post(API_URL + "login", userData);
    
    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }

    return response.data;
  },

  logout: async () => {
    localStorage.removeItem("user");
  },
};
