import axios from "axios";

const API_URL = "/api/users/";
export const goalService = {
  getGoals: async (user: any) => {
    const response = await axios.get(API_URL + "goals", user);
    return response.data;
  },
};
