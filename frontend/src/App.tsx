import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import AppRoutes from "./routes/AppRoutes";
import { useLocation } from "react-router-dom";
import { useAuthStore } from "./stores/useAuthStore";
import { useEffect } from "react";

function App() {
  const location = useLocation();
  const { loadUser } = useAuthStore();

  useEffect(() => {
    loadUser();
  }, []);

  const hideLayout =
    location.pathname === "/signup" ||
    location.pathname === "/login" ||
    location.pathname === "/admin" ||
    location.pathname === "/messaging"

  return (
    <div>
      <Toaster />

      {!hideLayout && <Navbar />}

      <AppRoutes />
    </div>
  );
}

export default App;
