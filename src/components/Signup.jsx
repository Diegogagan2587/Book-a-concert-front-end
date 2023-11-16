import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../redux/slices/userSlice';

const Signup = () => {
  const dispatch = useDispatch();
  const userStatus = useSelector((state) => state.user.status);
  const [userData, setUserData] = useState({ name: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSignup = () => {
    dispatch(registerUser(userData))
      .unwrap()
      .then((data) => {
        // Handle success
        setSuccessMessage(data.message); // Assuming the API returns a message on success
        setErrorMessage('');
      })
      .catch((rejectedValue) => {
        // Handle error
        setErrorMessage(rejectedValue.error);
        setSuccessMessage('');
      });
  };

  useEffect(() => {
    // Handle userStatus changes if needed
    console.log(userStatus);
  }, [userStatus]);

  return (
    <div className='login-page'>
      <h1>BOOK A CONCERT APP</h1>

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
          <div className='error'>
            {errorMessage}
          </div>
        )}

        {successMessage && (
          <div className='error'>
            {successMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default Signup;