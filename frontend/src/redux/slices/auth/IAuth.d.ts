export declare module IAuth {
  interface State {
    user: null | User;
    loading: "idle" | "pending" | "succeeded" | "failed";
    message: string;
  }

  interface User {
    name: string;
    email: string;
    password: string;
  }
}
