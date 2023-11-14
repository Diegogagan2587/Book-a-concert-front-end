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
    <nav className="border-2  w-full sm:w-1/4 ">
      <div className=" flex justify-between px-4 sm:hidden">
        <span onClick={() => handleMenu()}>
          <ion-icon name="menu-outline"></ion-icon>
        </span>
        <span>
          <ion-icon name="search-outline"></ion-icon>
        </span>
      </div>
      <ul
        className={`flex flex-col w-1/4 md:w-full absolute sm:relative bg-white px-4 h-screen 
        ${!isNavOpen && 'hidden sm:flex'}
        ${isNavOpen && 'z-40'}`}
      >
        <Link to="/">Main Page</Link>
        {isAuthenticated ? (
          <>
            <Link to="/reserve">Reserve</Link>
            <Link to="/my-reservations">My Reservations</Link>
            <Link to="/add-concert">Add Concert</Link>
            <Link to="/delete-concert">Delete Concert</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </ul>
    </nav>
  );
}

export default NavigationPanel;
