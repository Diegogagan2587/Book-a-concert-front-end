import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import '../stylesheets/Login.css';

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
    <div className='login-page'>
      <h1>BOOK A CONCERT APP</h1>
      <div className='login-container'>
        <input
          type="email"
          value={user.email}
          onChange={(e) => setUser({...user, email: e.target.value})}
          placeholder="user@mail.com"
          className='login-input'
          required
        />
        
        <input
        type='password'
        value={user.password}
        onChange={(e) => setUser({...user, password: e.target.value})}
        placeholder="Password"
        className='login-input'
        required
        />
        <button onClick={handleLogin} className='btn'>Login</button>
        {userStatus === 'failed' && (
          <div className='error'>
            <p>{userMessage || 'User not found'}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
