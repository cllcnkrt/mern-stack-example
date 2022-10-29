import { FaSignInAlt, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

import { logout, reset } from "../../redux/slices/auth";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
import { selectAuthState } from "../../redux/store/store";
function Header() {
  const { user } = useAppSelector(selectAuthState);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };
  return (
    <div className="header">
      <div className="logo">
        <Link to="/login">GoalSetter</Link>
      </div>

      <div>
        <ul>
          {user ? (
            <>
              <li>
                <button className="btn" onClick={handleLogout}>
                  <FaSignInAlt />
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login">
                  <FaSignInAlt />
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register">
                  <FaUser />
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Header;
