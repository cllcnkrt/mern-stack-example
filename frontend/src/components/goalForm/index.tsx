import { useState } from "react";

import { createGoal } from "../../redux/slices/goals";
import { useAppDispatch } from "../../redux/store/hooks";

function GoalForm() {
  const dispatch = useAppDispatch();
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(createGoal({ text }));
    setText("");
  };

  return (
    <section className="form">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="text">Goal</label>
          <input type="text" name="text" value={text} onChange={(e) => setText(e.target.value)} />
        </div>
        <div className="form-group">
          <button className="btn btn-block" type="submit">
            Add Goal
          </button>
        </div>
      </form>
    </section>
  );
}

export default GoalForm;
