import PropTypes from 'prop-types';

function RoundedButton({ text }) {
  return (
    <button
      className="container flex space-x-2 items-center w-28 md:w-40 py-1
        bg-[#94bc0c] border-white border-solid border-2 text-white
      rounded-xl md:rounded-2xl px-4
      hover:bg-slate-100 hover:text-[#94bc0c] hover:border-[#94bc0c]
      transition duration-500 ease-in-out"
    >
      <span className="text-xs md:text-xl">{text}</span>
      <ion-icon
        name="arrow-forward-circle-outline"
        className="text-xl"
      ></ion-icon>
    </button>
  );
}

//we validate text below
RoundedButton.propTypes = {
  text: PropTypes.string.isRequired,
};

export default RoundedButton;
