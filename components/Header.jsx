import React, { useState } from "react";
import PropTypes from "prop-types";
import Image from "next/image";
import { signOut } from "next-auth/react";

function Header({ title }) {
  const [toggle, setToggle] = useState(false);

  const openDropdown = () => {
    setToggle(!toggle);
  };

  return (
    <div className="flex w-full gap-4 px-4 pt-4 h-fit">
      <div className="self-center w-full text-3xl font-semibold">{title}</div>

      <div className="self-center w-auto dropdown">
        <button onClick={openDropdown}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-10 h-10"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
            />
          </svg>
        </button>
        <ul
          className={`${
            toggle ? "show" : ""
          } overflow-hidden text-white bg-black/80 divide-y backdrop-blur-lg w-24 text-center divide-white/20 rounded-lg dropdown-content fading`}
        >
          <li className="px-4 py-2 hover:bg-white/20 hover:font-semibold">
            Profile
          </li>
          <li className="py-2 hover:bg-white/20 hover:font-semibold">
            <button onClick={signOut}>Logout</button>
          </li>
        </ul>
      </div>
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
