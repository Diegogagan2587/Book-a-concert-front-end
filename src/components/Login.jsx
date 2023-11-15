import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import '../stylesheets/Login.css';

const Login = () => {
  const [username, setUsernameInput] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userStatus = useSelector((state) => state.user.status);
  const userMessage = useSelector((state) => state.user.details.message);

  const handleLogin = () => {
    dispatch(loginUser(username));
  };

  useEffect(() => {
    if (userStatus === 'succeeded') {
      navigate('/');
    }
  }, [userStatus, navigate]);

  return (
    <div className='login-page'>
      <h1>Book a Concert App</h1>
      <div className='login-container'>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsernameInput(e.target.value)}
          placeholder="Username"
          className='login-input'
          required
        />
        <button onClick={handleLogin} className='btn'>Login</button>
        {userStatus === 'failed' && (
          <div className='error'>
            <p>Error: {userMessage || 'User not found'}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
