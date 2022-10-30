export declare namespace GoalModel {
  namespace Goal {
    interface Response {
      createdAt: string;
      text: string;
      updatedAt: string;
      user: string;
      __v: string;
      _id: string;
    }

    type Request = Pick<Response, "text">;
  }
}
