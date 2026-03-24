import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../apis/user.api";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

const SignUp = () => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [activeField, setActiveField] = useState<
    "fullname" | "email" | "password" | null
  >(null);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    try {
      const data = await register(fullname, email, password);

      if (data?.message) {
        setErrorMessage(data.message);
      } else {
        const expireTime = Date.now() + 200 * 24 * 60 * 60 * 1000;
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("tokenExpire", expireTime.toString());
        setFullname("");
        setEmail("");
        setPassword("");
        toast.success(`Welcome ${data.user.fullname}!`);
        navigate("/");
      }
    } catch {
      toast.error("Error from Server");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (errorMessage) {
      const t = setTimeout(() => setErrorMessage(""), 5000);
      return () => clearTimeout(t);
    }
  }, [errorMessage]);

  return (
    <div className="flex h-screen">
      {/* FORM */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-6">
        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
          <h1 className="text-3xl font-bold text-center">Sign Up</h1>

          {errorMessage && (
            <div className="bg-red-100 text-[red] px-4 py-2 rounded mb-4 text-sm">
              {" "}
              {errorMessage}{" "}
            </div>
          )}

          {/* INPUT TRIGGERS */}
          <div
            onClick={() => setActiveField("fullname")}
            className="px-4 py-2 rounded-full bg-gray-100 cursor-pointer"
          >
            {fullname || "Full Name"}
          </div>

          <div
            onClick={() => setActiveField("email")}
            className="px-4 py-2 rounded-full bg-gray-100 cursor-pointer"
          >
            {email || "Email"}
          </div>

          <div
            onClick={() => setActiveField("password")}
            className="px-4 py-2 rounded-full bg-gray-100 cursor-pointer"
          >
            {password || "Password"}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-[red] w-full text-white py-2 rounded-full hover:bg-[#df0000] transition disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                Loading...
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>{" "}
              </>
            ) : (
              "Sign Up"
            )}
          </button>
          <p className="text-center mt-4 text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-[red] font-medium hover:underline transition"
            >
              Login
            </Link>
          </p>
        </form>
      </div>

      {/* IMAGE */}
      <div className="hidden md:block md:w-1/2 h-full overflow-hidden">
        <img
          src="/bg.jpg"
          className="w-full h-full object-cover transition-all duration-500 hover:brightness-90"
        />
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {activeField && (
          <motion.div
            className="fixed inset-0 bg-black/40 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white p-6 rounded-2xl w-80"
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <input
                autoFocus
                type={activeField === "password" ? "password" : "text"}
                value={
                  activeField === "fullname"
                    ? fullname
                    : activeField === "email"
                      ? email
                      : password
                }
                onChange={(e) => {
                  if (activeField === "fullname") setFullname(e.target.value);
                  if (activeField === "email") setEmail(e.target.value);
                  if (activeField === "password") setPassword(e.target.value);
                }}
                className="w-full px-4 py-2 bg-gray-100 rounded-full outline-none"
              />

              <button
                onClick={() => setActiveField(null)}
                className="mt-4 w-full bg-[red] text-white py-2 rounded-full"
              >
                Done
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SignUp;
