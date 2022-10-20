export declare module IAuth {
  interface State {
    user: User | null;
    loading: "idle" | "pending" | "succeeded" | "failed";
    message: string;
  }

  interface User {
    name: string;
    email: string;
    password: string;
  }
}
