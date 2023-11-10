/* eslint-disable no-unused-vars */
import './App.css'
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUsername } from './redux/slices/userSlice';

function App() {
  const [username, setUsernameInput] = useState('');
  const dispatch = useDispatch();

  const handleLogin = () => {
    dispatch(setUsername(username));
  };

  return (
    <div className='App'>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsernameInput(e.target.value)}
        placeholder="Username"
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default App;
