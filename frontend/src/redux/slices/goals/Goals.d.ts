export declare namespace IGoals {
  interface State {
    goals: [];
    loading: "idle" | "pending" | "succeeded" | "failed";
    errorMessage: string;
  }
}
