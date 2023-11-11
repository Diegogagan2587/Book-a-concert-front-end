// src/components/Login.jsx
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/slices/userSlice';

const Login = () => {
  const [username, setUsernameInput] = useState('');
  const dispatch = useDispatch();
  const userStatus = useSelector((state) => state.user.status);
  const userMessage = useSelector((state) => state.user.details.message); // New line

  const handleLogin = () => {
    dispatch(loginUser(username));
  };

  return (
    <div>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsernameInput(e.target.value)}
        placeholder="Username"
      />
      <button onClick={handleLogin}>Login</button>
      {userStatus === 'loading' && <p>Loading...</p>}
      {userStatus === 'failed' && <p>Error: {userMessage || 'User not found'}</p>}
      {userStatus === 'succeeded' && <p>{userMessage}</p>}

    </div>
  );
};

export default Login;
