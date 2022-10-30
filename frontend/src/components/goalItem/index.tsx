import { RiDeleteBin5Fill } from "react-icons/ri";

import { deleteGoal } from "../../redux/slices/goals";
import { useAppDispatch } from "../../redux/store/hooks";
import { IGoalItem } from "./GoalItem";
function GoalItem({ goal }: IGoalItem.Props) {
  const dispatch = useAppDispatch();
  return (
    <div className="goal">
      <div>{new Date(goal.createdAt).toLocaleString("en-US")}</div>
      <h2>{goal.text}</h2>
      <button className="close" onClick={() => dispatch(deleteGoal(goal._id))}>
        <RiDeleteBin5Fill size={18} />
      </button>
    </div>
  );
}

export default GoalItem;
