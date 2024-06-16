// src/components/NavigationPanel.jsx
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Link } from "react-router-dom";
import { logoutUser } from "../redux/slices/userSlice";
import { Icon } from "@iconify/react/dist/iconify.js";
import Logo from "../assets/img/logo.png";

function NavigationPanel() {
  const user = useSelector((state) => state.user.details);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const isAuthenticated = user && user.data; // Verifica si el usuario está autenticado
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };
  const handleMenu = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <nav className="border-2 sm:w-1/4 xl:w-1/6">
      <div className=" flex justify-between px-4 sm:hidden">
        <button onClick={() => handleMenu()}>
          <ion-icon
            name={`${(isNavOpen && "close-outline") || "menu-outline"}`}
          ></ion-icon>
          <span className="hidden">menu-outline</span>
        </button>
        <span>
          <ion-icon name="search-outline"></ion-icon>
        </span>
      </div>
      <ul
        className={`
         flex flex-col sm:justify-between sm:gap-6
         px-2
         overflow-scroll scrollbar-hide
         md:w-full absolute sm:relative bg-white h-screen 
         ${!isNavOpen && "sm:flex"}
         z-40
         transition-all duration-500 ease-in-out
         sm:left-0
         transform ${isNavOpen ? "left-0" : "left-[-100%]"}
         font-bold text-xl sm:text-md uppercase text-gray-600
       `}
      >
        <a href="/" className="site-logo mt-4">
          <img src={Logo} alt="nav-logo" className="w-64 h-fit" />
        </a>

        <div className="top-52 w-full">
          <li>
            <Link
              to="/"
              className="hover:bg-[#94bc0c] sm:pl-8 py-4 w-full block hover:text-white"
            >
              Home
            </Link>
          </li>
          {isAuthenticated ? (
            <>
              <li>
                <Link
                  to="/reserve"
                  className="hover:bg-[#94bc0c] sm:pl-8 py-4 w-full block hover:text-white"
                >
                  Reserve
                </Link>
              </li>
              <li>
                <Link
                  to="/my-reservations"
                  className="hover:bg-[#94bc0c] sm:pl-8 py-4 w-full block hover:text-white"
                >
                  Reservations
                </Link>
              </li>
              <li>
                <Link
                  to="/add-concert"
                  className="hover:bg-[#94bc0c] sm:pl-8 py-4 w-full block hover:text-white"
                >
                  Add Concert
                </Link>
              </li>
              <li>
                <Link
                  to="/delete-concert"
                  className="hover:bg-[#94bc0c] sm:pl-8 py-4 w-full block hover:text-white"
                >
                  Delete Concert
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="hover:bg-[#94bc0c] sm:pl-8 py-4 w-full block text-left hover:text-white"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  to="/login"
                  className="hover:bg-[#94bc0c] sm:pl-8 py-4 w-full block hover:text-white"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/signup"
                  className="hover:bg-[#94bc0c] sm:pl-8 py-4 w-full block hover:text-white"
                >
                  Signup
                </Link>
              </li>
            </>
          )}
        </div>
        <div className="nav-footer w-full flex flex-col gap-6 mb-4 text-gray-600 capitalize">
          <div className="logo flex w-full flex justify-center gap-4">
            <Icon icon="prime:twitter" />
            <Icon icon="ri:facebook-fill" />
            <Icon icon="entypo-social:google" />
          </div>
          <span className="text-sm text-gray font-medium text-center">
            © {new Date().getFullYear()} Copyright reserved
          </span>
        </div>
      </ul>
    </nav>
  );
}

export default NavigationPanel;
