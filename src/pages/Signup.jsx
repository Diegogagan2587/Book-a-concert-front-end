import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../redux/slices/userSlice';
import { selectUserStatus, selectSignupSuccessMessage, selectSignupErrorMessage } from '../redux/slices/userSlice';
import AuthContainer from '../components/AuthContainer';
import Loading from '../components/Loading';
import Alert from '../components/Alert';

const Signup = () => {
  const dispatch = useDispatch();
  const userStatus = useSelector(selectUserStatus);
  const successMessage = useSelector(selectSignupSuccessMessage);
  const errorMessage = useSelector(selectSignupErrorMessage);
  const [ validationError, setValidationError ] = useState('');
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const handleSignup = () => {
    if(userData.name && userData.email && userData.password){
      dispatch(registerUser(userData));
    } else {
      setValidationError('Please fill in all fields');
    }
  };

  useEffect(() => {
    // Handle userStatus changes if needed
    console.log(userStatus);
  }, [userStatus]);

  return (
    <AuthContainer>
      <div className="login-container">
        <input
          type="text"
          value={userData.name}
          onChange={(e) => setUserData({ ...userData, name: e.target.value })}
          placeholder="Username"
          className="login-input"
        />

        <input
          type="email"
          value={userData.email}
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
          placeholder="Email@example.com"
          className="login-input"
        />

        <input
          type="password"
          value={userData.password}
          onChange={(e) =>
            setUserData({ ...userData, password: e.target.value })
          }
          placeholder="Password"
          className="login-input"
          required
        />
        <button onClick={handleSignup} className="btn">
          Signup
        </button>
        {userStatus === 'loading' && <Loading />}
        {errorMessage && <Alert message={errorMessage} />}
        {successMessage && <Alert message={successMessage} />}
        {validationError && <Alert message={validationError} />}
      </div>
    </AuthContainer>
  );
};

export default Signup;
