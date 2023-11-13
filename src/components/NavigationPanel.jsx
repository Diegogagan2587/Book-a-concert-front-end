// src/components/NavigationPanel.jsx
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logoutUser } from '../redux/slices/userSlice';

function NavigationPanel() {
  const user = useSelector((state) => state.user.details);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/');
  };

  return (
    <nav>
      <Link to="/">Main Page</Link>
      {user ? (
        <>
          <Link to="/reserve">Reserve</Link>
          <Link to="/my-reservations">My Reservations</Link>
          <Link to="/add-concert">Add Concert</Link>
          <Link to="/delete-concert">Delete Concert</Link>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <button onClick={() => navigate('/login')}>Login</button>
          <button onClick={() => navigate('/signup')}>Signup</button>
        </>
      )}
    </nav>
  );
}

export default NavigationPanel;
