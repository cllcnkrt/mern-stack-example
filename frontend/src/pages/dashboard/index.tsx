import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { GoalForm } from "../../components";
import { useAppSelector } from "../../redux/store/hooks";
import { selectAuthState } from "../../redux/store/store";

function Dashboard() {
  const navigate = useNavigate();

  const { user } = useAppSelector(selectAuthState);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  return (
    <>
      <section className="heading">
        <h1>Welcome {user && user.name}</h1>
      </section>
      <GoalForm />
    </>
  );
}

export default Dashboard;
