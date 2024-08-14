import PropTypes from 'prop-types';

const Alert = ({message}) => {
  return (
    <div className="error max-w-md">{message}</div>
  )
};

Alert.propTypes = {
  message: PropTypes.string,
};

export default Alert;