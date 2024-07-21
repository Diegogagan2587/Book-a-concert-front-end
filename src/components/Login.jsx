import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import '../stylesheets/Login.css';
import concertSVG from '../assets/concert-icon.svg';
import concertBG from '../assets/img/concert-bg-1.jpg';
import Loading from './Loading';

const Login = () => {
  const [user, setUser] = useState({ email: '', password: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userStatus = useSelector((state) => state.user.status);
  const userMessage = useSelector((state) => state.user.details.message);

  const handleLogin = () => {
    dispatch(loginUser(user));
  };

  useEffect(() => {
    if (userStatus === 'succeeded') {
      navigate('/');
    }
  }, [userStatus, navigate]);

  return (
    <div className="login-page">
      <img src={concertBG} alt="concert icon" className="fixed z-0 w-1/2" />
      <div className="z-10 flex flex-col items-center">
        <h1 className="font-bold text-center font-sans">BOOK A CONCERT APP</h1>
        <div className="login-container">
          <input
            type="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder="user@mail.com"
            className="login-input"
            required
          />
          <input
            type="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="Password"
            className="login-input"
            required
          />
          <button onClick={handleLogin} className="btn">
            Login
          </button>
          {userStatus === 'loading' && <Loading />}
          {userStatus === 'failed' && (
            <div className="error">
              <p>{userMessage || 'User not found'}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
