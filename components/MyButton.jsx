import React from "react";
import PropTypes from "prop-types";
import Image from "next/image";

function MyButton({ text, width, isLoading, icon, func }) {
  return (
    <button
      onClick={func}
      className={`group font-bold text-black bg-white gap-1 ${width} mt-3 px-5 py-2.5 items-center rounded-xl justify-center inline-flex transition duration-300 ease-in hover:bg-black hover:text-white`}
    >
      {isLoading ? (
        <div className="w-4 h-4 border-4 border-black border-solid rounded-full group-hover:border-white animate-spin border-t-white group-hover:border-t-black" />
      ) : (
        ""
      )}

      {icon ? (
        <Image src="/icon/google.png" width={24} height={24} alt="icon" />
      ) : (
        ""
      )}

      {text}
    </button>
  );
}

MyButton.propTypes = {
  text: PropTypes.string.isRequired,
  width: PropTypes.string,
  isLoading: PropTypes.bool,
  icon: PropTypes.string,
  func: PropTypes.func,
};

export default MyButton;
