import {
  FaBars,
  FaBell,
  FaChevronDown,
  FaHome,
  FaPlus,
  FaSearch,
  FaUsers,
} from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/useAuthStore";
import { useEffect, useState } from "react";
import { useNotificationStore } from "../stores/useNotificationStore";
import NavbarSkeleton from "./skeletons/NavbarSkeleton";

const Navbar = () => {
  const { user, logout, loadUser } = useAuthStore();
  const { unreadCount } = useNotificationStore();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      await loadUser();
      setLoading(false);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const handleClickOutside = () => {
      setOpen(false);
    };
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  const navLinks = [
    { title: "Home", link: "/", icon: <FaHome /> },
    { title: "Create", link: "/user/pin", icon: <FaPlus /> },
    { title: "Users", link: "/users", icon: <FaUsers /> },
    { title: "Messaging", link: "/messaging", icon: <FaMessage /> },
    {
      title: "",
      link: "/notifications",
      icon: (
        <div className="relative">
          <FaBell className="text-xl" />

          {/*  red badge */}
          {unreadCount > 0 && (
            <>
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-[red] rounded-full animate-ping" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-[red] rounded-full" />
            </>
          )}
        </div>
      ),
    },
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/?search=${search}`);
  };

  if (loading) return <NavbarSkeleton />;

  return (
    <>
      {/* NAVBAR */}
      <nav className="w-full fixed top-0 right-0 left-0 z-10 bg-white shadow-md px-6 py-3 flex items-center justify-between">
        {/* Left */}
        <div className="flex items-center gap-3">
          {/* MENU BUTTON (Mobile) */}
          <button
            className="md:hidden text-2xl"
            onClick={(e) => {
              e.stopPropagation();
              setMenuOpen(true);
            }}
          >
            <FaBars />
          </button>

          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src={user ? "/logo.svg" : "logo.webp"}
              alt="logo"
              className={
                user
                  ? "h-10 w-10 rounded-full transition-all duration-300 hover:scale-125"
                  : "h-10 w-40 object-cover transition-all duration-300 hover:scale-105"
              }
            />
          </Link>
        </div>

        {/* Search */}
        {user && (
          <div className="flex-1 mx-6 hidden lg:block">
            <form onSubmit={handleSearch}>
              <div className="relative w-full">
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-gray-100 pl-10 pr-4 py-2 rounded-full outline-none focus:ring-2 focus:ring-[red]"
                />
              </div>
            </form>
          </div>
        )}

        {/* Links (Desktop) */}
        <div className="hidden md:flex items-center gap-6">
          {user &&
            navLinks.map((nav) => (
              <Link
                key={nav.title}
                to={nav.link}
                className="flex items-center gap-2 text-gray-700 hover:text-[red] transition"
              >
                <span className="text-lg">{nav.icon}</span>
                <span>{nav.title}</span>
              </Link>
            ))}
        </div>

        {/* Auth */}
        <div className="flex items-center gap-3 ml-6 relative">
          {user ? (
            <>
              {/* Avatar */}
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setOpen(!open);
                }}
                className="flex items-center gap-1 cursor-pointer"
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpen(!open);
                  }}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-gray-100 transition"
                >
                  <img
                    src={user.avatar as string}
                    className="w-9 h-9 rounded-full object-cover ring-2 ring-[red]"
                  />

                  <FaChevronDown
                    className={`text-gray-600 transition-transform duration-300 ${
                      open ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </div>

              {/* Dropdown */}
              {open && (
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="absolute right-0 top-14 bg-white shadow-lg rounded-xl w-60 p-4 z-50"
                >
                  <div
                    onClick={() => {
                      navigate("/profile");
                      setOpen(false);
                    }}
                    className="cursor-pointer hover:bg-gray-100 p-2 rounded-lg"
                  >
                    <p className="font-semibold text-sm">{user.fullname}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>

                  <hr className="my-2" />

                  <button
                    onClick={handleLogout}
                    className="w-full text-left text-[red] hover:bg-red-50 p-2 rounded-lg text-sm"
                  >
                    Logout
                  </button>
                </div>
              )}
            </>
          ) : (
            <>
              <Link
                to="/signup"
                className="px-4 py-2 rounded-full bg-[red] text-white hover:bg-[#ed0000] transition"
              >
                Sign Up
              </Link>

              <Link
                to="/login"
                className="px-4 py-2 rounded-full text-[red] border border-[red] hover:bg-[red] hover:text-white transition"
              >
                Login
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* SIDEBAR MOBILE */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 md:hidden transition-opacity duration-300 ${
          menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setMenuOpen(false)}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={`w-64 h-full bg-white p-5 shadow-xl transform transition-transform duration-300 ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Logo */}
          <div className="mb-6">
            <img src="/logo.svg" className="h-10 w-10 rounded-full" />
          </div>

          {/* Links */}
          <div className="flex flex-col gap-4">
            {navLinks.map((nav) => (
              <Link
                key={nav.title}
                to={nav.link}
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 text-gray-700 hover:text-[red] transition"
              >
                <span>{nav.icon}</span>
                <span>{nav.title}</span>
              </Link>
            ))}
          </div>

          {/* Auth */}
          <div className="mt-6 border-t pt-4">
            {user ? (
              <>
                <div
                  onClick={() => {
                    navigate("/profile");
                    setMenuOpen(false);
                  }}
                  className="cursor-pointer flex items-center gap-3 mb-4"
                >
                  <img
                    src={user.avatar as string}
                    className="w-10 h-10 rounded-full ring-2 ring-[red]"
                  />
                  <div>
                    <p className="text-sm font-semibold">{user.fullname}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                </div>

                <button
                  onClick={handleLogout}
                  className="w-full text-left text-[red] hover:bg-red-50 p-2 rounded-lg text-sm"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="block mb-2 text-[red]"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setMenuOpen(false)}
                  className="block bg-[red] text-white text-center py-2 rounded-lg"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
