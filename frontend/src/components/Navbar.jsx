import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const {user} = useAuth();
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/destinations">Destinations</Link>
      {user && user.role === "admin" && <Link to="/admin">Admin Dashboard</Link>}
      {user ? <button>Logout</button> : <Link to="/login">Login</Link>}
      <Link to="/login">Login</Link>
      <Link to="/signup">Signup</Link>
    </nav>
  );
};

export default Navbar;
