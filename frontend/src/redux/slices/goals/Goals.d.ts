export declare namespace IGoals {
  interface State {
    goals: object[];
    loading: "idle" | "pending" | "succeeded" | "failed";
    errorMessage: string;
  }


  
}
