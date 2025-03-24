import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DestinationForm from "./components/destinations/DestinationForm";
import DestinationList from "./components/destinations/DestinationList";
import { useAuth } from "./context/AuthContext";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import Home from "./pages/Home";
import DestinationDetails from "./pages/DestinationDetail";
import PrivateRoute from "./routes/PrivateRoute";
import AdminDashboard from "./pages/AdminDashboard";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
const App = () => {
  const { user } = useAuth();
  return (
   
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/add-destination" element={<DestinationForm />} />
        <Route path="/destinations" element={<DestinationList />} />
        <Route path="/destinations/:id" element={<DestinationDetails />} />

        <Route element={<PrivateRoute adminOnly={true} />}>
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>

      </Routes>
    </Router>
  );
};

export default App;
