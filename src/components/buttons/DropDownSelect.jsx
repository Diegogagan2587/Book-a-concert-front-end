import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function DropDownSelect({ id, name, items, onChange, placeHolder }) {
  const [selectedValue, setSelectedValue] = useState('');
  const reset = useSelector((state) => state.reservation.form.resetForm);

  const handleSelectChange = (e) => {
    const value = e.target.value;
    setSelectedValue(value);
    onChange(e);
  };

  useEffect(() => {
    if(reset){
      setSelectedValue('');
    }
  },[reset]);

  return (
    <select
      onChange={handleSelectChange}
      id={id}
      name={name}
      className="bg-[#96bf01] hover:bg-slate-100 text-white hover:text-[#94bc0c]
        border-2 hover:border-[#94bc0c]
        flex items-center w-28 md:w-40
        p-2 rounded-2xl
        transition duration-500 ease-in-out"
      value={selectedValue}
    >
      {/* Placeholder option */}
      <option value="" disabled={!selectedValue} hidden={!!selectedValue}>
        {placeHolder}
      </option>

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
  onChange: PropTypes.func,
  placeHolder: PropTypes.string,
};

export default DropDownSelect;
