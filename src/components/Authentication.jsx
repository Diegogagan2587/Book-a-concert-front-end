import { useState } from 'react';
import Login from './Login';
import Signup from './Signup';

function Authentication() {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div>
      <button onClick={() => setShowLogin(true)}>Login</button>
      <button onClick={() => setShowLogin(false)}>Signup</button>
      {showLogin ? <Login /> : <Signup />}
    </div>
  );
}

export default Authentication;
