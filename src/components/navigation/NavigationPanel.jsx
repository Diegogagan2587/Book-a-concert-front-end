// src/components/NavigationPanel.jsx
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { logoutUser } from '../../redux/slices/userSlice';
import Item from './Item';

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
    <nav className="border-2 sm:flex w-full sm:w-1/4">
      <div className=" flex justify-between px-4 sm:hidden">
        <button onClick={() => handleMenu()}>
          <ion-icon
            name={`${(isNavOpen && 'close-outline') || 'menu-outline'}`}
          ></ion-icon>
          <span className="hidden">menu-outline</span>
        </button>
        <span>
          <ion-icon name="search-outline"></ion-icon>
        </span>
      </div>
      <ul
        className={`
         flex flex-col sm:justify-center sm:gap-10 pl-4 pr-4
          w-2/3 sm:w-full absolute sm:relative bg-white px-4 h-screen 
         ${!isNavOpen && 'sm:flex'}
         z-40
         transition-all duration-500 ease-in-out
         sm:left-0
         transform ${isNavOpen ? 'left-0' : 'left-[-100%]'}
       `}
      >
        <Item to="/" text="Home" onClick={()=> setIsNavOpen(false)}/>
        {isAuthenticated ? (
          <>
            <Item to="/reserve" text="Reserve" onClick={()=> setIsNavOpen(false)}/>
            <Item to="/my-reservations" text="Reservations" onClick={()=> setIsNavOpen(false)}/>
            <Item to="/add-concert" text="Add Concert" onClick={()=> setIsNavOpen(false)}/>
            <Item to="/delete-concert" text="Delete Concert" onClick={()=> setIsNavOpen(false)}/>
            <li>
              <button
                onClick={handleLogout}
                className="hover:bg-[#94bc0c] pl-4 py-4 w-full block text-left"
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <Item to="/login" text="Login" onClick={()=> setIsNavOpen(false)}/>
            <Item to="/signup" text="Signup" onClick={()=> setIsNavOpen(false)}/>
          </>
        )}
      </ul>
    </nav>
  );
}

export default NavigationPanel;
