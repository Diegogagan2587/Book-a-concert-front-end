import '../stylesheets/Login.css';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../redux/slices/userSlice';
import AuthContainer from '../components/AuthContainer';
import Loading from '../components/Loading';

const Login = () => {
  const [user, setUser] = useState({ email: '', password: '' });
  const [validationError, setValidationError] = useState('');
  const userStatus = useSelector((state) => state.user.status);
  const userMessage = useSelector((state) => state.user.details.message);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (user.email && user.password) {
      dispatch(loginUser(user));
    } else {
      setValidationError('Please fill in all fields');
    }
  };

  useEffect(() => {
    if (userStatus === 'succeeded') {
      navigate('/');
    }
  }, [userStatus, navigate]);

  return (
    <AuthContainer>
      <form className="login-container">
        <input
          type="email"
          aria-label='Email'
          value={user.email}
          onChange={(e) => {
            setUser({ ...user, email: e.target.value });
            setValidationError('');
          }}
          placeholder="user@mail.com"
          className="login-input"
          required
        />
        <input
          type="password"
          aria-label='Password'
          value={user.password}
          onChange={(e) => {
            setUser({ ...user, password: e.target.value });
            setValidationError('');
          }}
          placeholder="Password"
          className="login-input"
          required
        />
        <button
          aria-label="Login"
          type="submmit"
          onClick={handleLogin}
          className="btn"
        >
          Login
        </button>
        {validationError && <p className="error">{validationError}</p>}
        {userStatus === 'loading' && <Loading />}
        {userStatus === 'failed' && (
          <div className="error">
            <p>{userMessage || 'User not found'}</p>
          </div>
        )}
      </form>
    </AuthContainer>
  );
};

export default Login;
