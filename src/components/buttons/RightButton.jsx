function RightButton() {
    return (
      <button
        className="flex items-center justify-end text-xl w-16 md:w-20 py-1 
    bg-[#94bc0c] border-white border-solid border-2 text-white
  rounded-l-xl md:rounded-l-2xl px-4
  hover:bg-slate-100 hover:text-[#94bc0c] hover:border-[#94bc0c]
  transition duration-500 ease-in-out"
      >
        <ion-icon name="chevron-forward-outline"></ion-icon>
      </button>
    );
  }
  
  export default RightButton;
  