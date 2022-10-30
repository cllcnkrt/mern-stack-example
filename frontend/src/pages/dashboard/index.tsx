import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { GoalForm, GoalItem, Spinner } from "../../components";
import { getGoals, reset } from "../../redux/slices/goals";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
import { selectAuthState, selectGoalsState } from "../../redux/store/store";

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { user } = useAppSelector(selectAuthState);
  const { goals, loading, errorMessage } = useAppSelector(selectGoalsState);

  useEffect(() => {
    if (errorMessage) {
      toast(errorMessage);
    }

    if (!user) {
      navigate("/login");
    }

    dispatch(getGoals());

    return () => {
      dispatch(reset());
    };
  }, [dispatch, errorMessage, navigate, user]);

  if (loading === "pending") {
    return <Spinner />;
  }

  return (
    <>
      <section className="heading">
        <h1>Welcome {user && user.name}</h1>
      </section>
      <GoalForm />

      <section className="content">
        {goals.length > 0 ? (
          <div className="goals">
            {goals.map((goal) => (
              <GoalItem key={goal._id} goal={goal} />
            ))}
          </div>
        ) : (
          <h3> You have no goals yet. Add a goal to get started.</h3>
        )}
      </section>
    </>
  );
}

export default Dashboard;
