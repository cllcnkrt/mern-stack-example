export declare namespace IAuth {
  interface State {
    user: User | null;
    loading: "idle" | "pending" | "succeeded" | "failed";
    errorMessage: string;
  }

  interface User {
    name: string;
    email: string;
    password: string;
  }
}
