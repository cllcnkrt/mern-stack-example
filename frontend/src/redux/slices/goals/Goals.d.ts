export declare namespace IGoals {
  interface State {
    goals: Goal[];
    loading: "idle" | "pending" | "succeeded" | "failed";
    errorMessage: string;
  }

  interface Goal {
    createdAt: string;
    text: string;
    updatedAt: string;
    user: string;
    __v: string;
    _id: string;
  }
}
