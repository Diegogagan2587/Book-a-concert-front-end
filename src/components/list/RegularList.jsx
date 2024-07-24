import { PropTypes } from 'prop-types';

const RegularList = ({
  items,
  resourceName,
  ItemComponent: ItemComponent,
  handleDelete,
}) => {
  return (
    <>
      {items.length > 0 &&
        items.map((item) => (
          <ItemComponent
            key={item.id}
            {...{ [resourceName]: item }}
            handleDelete={handleDelete}
          />
          // The above line is equivalent to:
          // <ItemComponent concert={item} />
          // <ItemComponent reservation={item} />
          //or any other item name, etc.
        ))}
    </>
  );
};

RegularList.propTypes = {
  items: PropTypes.array.isRequired,
  resourceName: PropTypes.string.isRequired,
  ItemComponent: PropTypes.func.isRequired,
  handleDelete: PropTypes.func,
};
export default RegularList;
