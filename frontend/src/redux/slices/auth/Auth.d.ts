export declare namespace IAuth {
  interface State {
    user: RegisterPayload | LoginPayload | null;
    loading: "idle" | "pending" | "succeeded" | "failed";
    errorMessage: string;
  }

  interface RegisterPayload {
    name: string;
    email: string;
    password: string;
  }

  interface LoginPayload {
    email: string;
    password: string;
  }
}
