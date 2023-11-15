import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../redux/slices/userSlice';

const Signup = () => {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    name: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignup = () => {
    dispatch(registerUser(userData))
      .then((result) => {
        // Handle successful registration
        setErrorMessage(''); // Clear any previous error message
      })
      .catch((error) => {
        if (error.payload && error.payload.error) {
          setErrorMessage(error.payload.error);
        } else {
          setErrorMessage('An unexpected error occurred');
        }
      });
  };

  return (
    <div className='login-page'>
      <h1>Book a Concert App</h1>

      <div className='login-container'>
        <input
          type="text"
          value={userData.name}
          onChange={(e) => setUserData({ ...userData, name: e.target.value })}
          placeholder="Username"
          className='login-input'
        />
        <button onClick={handleSignup} className='btn'>Signup</button>

        {errorMessage && (
          <div className='error-message'>
            {errorMessage}
          </div>
        )}

      </div>
    </div>
  );
};

export default Signup;
