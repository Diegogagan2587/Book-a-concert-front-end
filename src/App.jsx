// src/App.jsx
import { useState } from 'react';
import './App.css';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className='App'>
      <button onClick={() => setShowLogin(true)}>Login</button>
      <button onClick={() => setShowLogin(false)}>Signup</button>
      {showLogin ? <Login /> : <Signup />}
    </div>
  );
}

export default App;
