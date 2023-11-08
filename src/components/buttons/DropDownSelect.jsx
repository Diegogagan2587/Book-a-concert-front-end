import PropTypes from "prop-types";

function DropDownSelect({ id, name, items }) {
  return (
    <select
      id={`${id}`}
      name={`${name}`}
      className="bg-[#96bf01] hover:bg-slate-100 text-white hover:text-[#94bc0c]
    border-2 hover:border-[#94bc0c]
    flex items-center w-28 md:w-40
   p-2 rounded-2xl
   transition duration-500 ease-in-out"
    >
      {items.map((item, index) => (
        <option key={index} value={item}>
          {item}
        </option>
      ))}
    </select>
  );
}
DropDownSelect.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
};

export default DropDownSelect;