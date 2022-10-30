export declare namespace AuthModel {
  namespace Auth {
    interface RegisterRequest {
      name: string;
      email: string;
      password: string;
    }

    interface Response {
      email: string;
      name: string;
      token: string;
      _id: string;
    }

    type LoginRequest = Omit<RegisterRequest, "name">;
  }
}
