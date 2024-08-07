import PropTypes from 'prop-types';

const Alert = (errorMessage) => {
  return (
    <div className="error">{errorMessage}</div>
  )
};

Alert.propTypes = {
  errorMessage: PropTypes.string,
};

export default Alert;