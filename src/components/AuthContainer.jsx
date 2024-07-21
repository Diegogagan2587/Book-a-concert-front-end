import { PropTypes } from 'prop-types';
import concertBG from '../assets/img/concert-bg-1.jpg';

const AuthContainer = ({ children }) => {
  return (
    <div className="auth-container login-page">
      <img
        src={concertBG}
        alt="concert icon"
        className="z-0 
          object-cover sm:object-fill
          absolute sm:fixed
          h-screen sm:h-auto 
          w-auto sm:w-3/4 lg:w-1/2"
      />
      <div className="z-10 flex flex-col items-center">
      <h1 className="font-bold text-center font-sans">BOOK A CONCERT APP</h1>
        {children}
      </div>
    </div>
  );
};

AuthContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContainer;
