import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/destinations">Destinations</Link>
      {user && user.role === "admin" && <Link to="/admin">Admin Dashboard</Link>}
      {user ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </>
      )}
      {user && <Link to="/profile">Profile</Link>}
    </nav>
  );
};

export default Navbar;
