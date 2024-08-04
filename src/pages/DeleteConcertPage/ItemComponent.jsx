import { PropTypes } from 'prop-types';

const ItemComponent = ({concert, handleDelete}) => {
    const { title, id } = concert;

    return (
      <li>
        <span>{title}</span>
        <button onClick={()=>handleDelete(id)}>Delete</button>
      </li>
    );
  };

  ItemComponent.propTypes = {
    concert: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired,
  };

  export default ItemComponent;