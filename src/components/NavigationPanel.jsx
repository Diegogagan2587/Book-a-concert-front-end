// src/components/NavigationPanel.jsx
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { logoutUser } from '../redux/slices/userSlice';

function NavigationPanel() {
  const user = useSelector((state) => state.user.details);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const isAuthenticated = user && user.username; // Verifica si el usuario está autenticado
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };
  const handleMenu = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <nav className="border-2 sm:flex w-full sm:w-1/4">
      <div className=" flex justify-between px-4 sm:hidden">
        <span onClick={() => handleMenu()}>
          <ion-icon
            name={`${(isNavOpen && 'close-outline') || 'menu-outline'}`}
          ></ion-icon>
        </span>
        <span>
          <ion-icon name="search-outline"></ion-icon>
        </span>
      </div>
      <ul
        className={`
         flex flex-col sm:justify-center sm:gap-10 pl-4 pr-4
         w-1/3 md:w-full absolute sm:relative bg-white px-4 h-screen 
         ${!isNavOpen && 'sm:flex'}
         z-40
         transition-all duration-500 ease-in-out
         sm:left-0
         transform ${isNavOpen ? 'left-0' : 'left-[-100%]'}
       `}
      >
        <li className="hover:bg-[#94bc0c] pl-4 py-4">
          <Link to="/">Home</Link>
        </li>
        {isAuthenticated ? (
          <>
            <li className="hover:bg-[#94bc0c] pl-4 py-4">
              <Link to="/reserve" className="">
                Reserve
              </Link>
            </li>
            <li className="hover:bg-[#94bc0c] pl-4 py-4">
              <Link to="/my-reservations">Reservations</Link>
            </li>
            <li className="hover:bg-[#94bc0c] pl-4 py-4">
              <Link to="/add-concert">Add Concert</Link>
            </li>
            <li className="hover:bg-[#94bc0c] pl-4 py-4">
              <Link to="/delete-concert">Delete Concert</Link>
            </li>
            <li className="hover:bg-[#94bc0c] pl-4 py-4">
              <button onClick={handleLogout}>Logout</button>
            </li>
          </>
        ) : (
          <>
            <li className="hover:bg-[#94bc0c] pl-4 py-4">
              <Link to="/login">Login</Link>
            </li>
            <li className="hover:bg-[#94bc0c] pl-4 py-4">
              <Link to="/signup">Signup</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default NavigationPanel;
