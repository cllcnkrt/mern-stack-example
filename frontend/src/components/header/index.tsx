import { FaSignInAlt, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="header">
      <div className="logo">
        <Link to="/login">GoalSetter</Link>
      </div>

      <div>
        <ul>
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
        </ul>
      </div>
    </div>
  );
}

export default Header;
