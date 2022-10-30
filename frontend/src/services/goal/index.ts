import axios from "axios";

import { GoalModel } from "./GoalModel";

const API_URL = "/api/goals/";

export const goalService = {
  createGoal: async (payload: GoalModel.Goal.Request, token: string) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.post(API_URL, payload, config);
    return response.data;
  },
};
