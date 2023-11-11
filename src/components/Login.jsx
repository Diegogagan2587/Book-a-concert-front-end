// src/components/Login.jsx
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUsername, getCurrentUser } from '../redux/slices/userSlice';

const Login = () => {
  const [username, setUsernameInput] = useState('');
  const dispatch = useDispatch();
  const userStatus = useSelector(state => state.user.status);

  const handleLogin = () => {
    dispatch(setUsername(username));
    dispatch(getCurrentUser(username));
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
      {userStatus === 'failed' && <p>Error: User not found</p>}
    </div>
  );
};

export default Login;
