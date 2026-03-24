import { Route, Routes } from "react-router-dom";
import SignUp from "../pages/SignUp";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import UserPin from "../pages/UserPin";
import AdminDashboard from "../pages/AdminDashboard";
import PinDetails from "../pages/PinDetails";
import ViewProfile from "../pages/ViewProfile";
import Users from "../pages/Users";
import NotFound from "../components/NotFound";
import Messaging from "../pages/Messaging";
import Notifications from "../pages/Notifications";
import Privacy from "../pages/Privacy";
import Terms from "../pages/Terms";

const AppRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/user/:id" element={<ViewProfile />} />
        <Route path="/users" element={<Users />} />
        <Route path="/user/pin" element={<UserPin />} />
        <Route path="/pin/:id" element={<PinDetails />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/messaging" element={<Messaging />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default AppRoutes;
