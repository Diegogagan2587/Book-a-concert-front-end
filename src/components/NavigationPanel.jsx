// src/components/NavigationPanel.jsx
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutUser } from '../redux/slices/userSlice';

function NavigationPanel() {
  const user = useSelector((state) => state.user.details);
  const isAuthenticated = user && user.username; // Verifica si el usuario está autenticado
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <nav>
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
    </nav>
  );
}

export default NavigationPanel;
