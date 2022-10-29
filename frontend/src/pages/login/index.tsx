import { FormEvent, useState } from "react";
import { useEffect } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { Spinner } from "../../components";
import { login } from "../../redux/slices/auth";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
import { selectAuthState } from "../../redux/store/store";
interface form {
  email: string;
  password: string;
}

function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { user, loading, errorMessage } = useAppSelector(selectAuthState);

  const [formData, setFormData] = useState<form>({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  useEffect(() => {
    if (loading === "failed") {
      toast.error(errorMessage);
    }
    if (loading === "succeeded" || user) {
      toast.success("Login successful");
      navigate("/");
    }
  }, [loading, user, navigate, dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };
    dispatch(login(userData));
  };

  if (loading === "pending") return <Spinner />;
  return (
    <>
      <section className="heading">
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Login and start setting your goals</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              placeholder="Please enter your email"
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              placeholder="Please enter your password"
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Login;
