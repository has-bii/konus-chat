import React from "react";
import PropTypes from "prop-types";

function SearchInput({ value, searching, func, placeholder }) {
  return (
    <div className="flex items-center w-full gap-2 px-3 pt-4 pb-2 h-fit">
      <input
        value={value}
        onChange={searching}
        type="text"
        className="w-full px-4 py-2 bg-black/[0.05] transition hover:bg-white/5 border border-white/30 border-opacity-50 rounded-xl ring-0 outline-0 placeholder:text-white/75"
        placeholder={placeholder}
      />
      <button
        onClick={func}
        className="flex-shrink p-2 border group border-white/30 rounded-xl transition bg-black/[0.05] hover:bg-white/5"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.2}
          className="w-6 h-6 transition group-hover:stroke-white/75 group-hover:stroke-2 stroke-white/50"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
          />
        </svg>
      </button>
    </div>
  );
}

SearchInput.propTypes = {
  value: PropTypes.string,
  searching: PropTypes.func,
  func: PropTypes.func,
  placeholder: PropTypes.string,
};

export default SearchInput;
