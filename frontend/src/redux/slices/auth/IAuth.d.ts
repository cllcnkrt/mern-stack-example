export declare namespace IAuth {
  interface State {
    user: User | null;
    loading: "idle" | "pending" | "succeeded" | "failed";
  }

  interface User {
    name: string;
    email: string;
    password: string;
  }
}
