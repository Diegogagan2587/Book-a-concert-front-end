import PropTypes from 'prop-types';

const Alert = ({message}) => {
  return (
    <div className="error">{message}</div>
  )
};

Alert.propTypes = {
  message: PropTypes.string,
};

export default Alert;