import { FormEvent, useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { Spinner } from "../../components/";
import { register, reset } from "../../redux/slices/auth";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
import { selectAuthState } from "../../redux/store/store";
interface formTypes {
  name: string;
  email: string;
  password: string;
  password2: string;
}

function Register() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { user, loading } = useAppSelector(selectAuthState);

  const [formData, setFormData] = useState<formTypes>({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;
  useEffect(() => {
    if (loading === "failed") {
      toast.error("Something went wrong");
    }
    if (loading === "succeeded") {
      toast.success("Registration successful");
      navigate("/");
    }
    if (!loading) dispatch(reset());
  }, [loading, user, navigate, dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== password2) {
      toast.error("Passwords do not match");
    } else {
      const userData = {
        name,
        email,
        password,
      };
      dispatch(register(userData));
    }
  };

  if (loading === "pending") return <Spinner />;

  return (
    <>
      <section className="heading">
        <h1>
          <FaUser /> Register
        </h1>
        <p>Please create an account</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={name}
              placeholder="Please enter your name"
              onChange={handleChange}
            />
          </div>

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
            <input
              type="password"
              className="form-control"
              id="password2"
              name="password2"
              value={password2}
              placeholder="Please confirm your password"
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

export default Register;
