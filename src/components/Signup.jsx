// src/components/Signup.jsx
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../redux/slices/userSlice';

const Signup = () => {
  const [userData, setUserData] = useState({
    name: '',
  });
  const dispatch = useDispatch();

  const handleSignup = () => {
    dispatch(registerUser(userData));
  };

  return (
    <div>
      <input
        type="text"
        value={userData.name}
        onChange={(e) => setUserData({ ...userData, name: e.target.value })}
        placeholder="Username"
      />
      <button onClick={handleSignup}>Sign Up</button>
    </div>
  );
};

export default Signup;
