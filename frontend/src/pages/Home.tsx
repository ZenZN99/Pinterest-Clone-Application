import { useEffect, useState } from "react";
import { useAuthStore } from "../stores/useAuthStore";
import Main from "./Main";
import Welcome from "./Welcome";

const Home = () => {
  const { user, loadUser } = useAuthStore();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      await loadUser();
      setLoading(false);
    };

    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="w-10 h-10 border-4 border-[red] border-t-transparent rounded-full animate-spin"></span>
      </div>
    );
  }

  return <div>{user ? <Main /> : <Welcome />}</div>;
};
export default Home;
