import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const item = ({ text, to, onClick }) => {
  return (
    <li>
      <Link to={to} onClick={onClick} className="hover:bg-[#94bc0c] pl-4 py-4 w-full block">
        {text}
      </Link>
    </li>
  );
};

item.propTypes = {
  text: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

export default item;
