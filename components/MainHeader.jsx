import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { signOut } from "next-auth/react";
import Link from "next/link";
``;
function MainHeader({ title }) {
  const [toggle, setToggle] = useState(false);

  const openDropdown = () => {
    setToggle(!toggle);
  };

  return (
    <div className="flex w-full gap-4 px-4 pt-4 h-fit bg-white/10 border-b-white/[.2] border-b">
      <div className="self-center w-full pb-4 text-3xl font-semibold">
        {title}
      </div>

      <div className="self-center w-auto dropdown lg:hidden">
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
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
        <ul
          className={`${
            toggle ? "show" : ""
          } text-white overflow-hidden bg-black/80 divide-y backdrop-blur-lg w-24 text-center divide-white/20 rounded-lg dropdown-content fading`}
        >
          <li className="px-4 py-2 hover:bg-white/20 hover:font-semibold">
            <Link href="/">Chats</Link>
          </li>
          <li className="px-4 py-2 hover:bg-white/20 hover:font-semibold">
            <Link href="/friends">Friends</Link>
          </li>
          <li className="px-4 py-2 hover:bg-white/20 hover:font-semibold">
            <Link href="/profile">Profile</Link>
          </li>
          <li className="px-4 py-2 hover:bg-white/20 hover:font-semibold">
            <button onClick={signOut}>Logout</button>
          </li>
        </ul>
      </div>
    </div>
  );
}

MainHeader.propTypes = {
  title: PropTypes.string.isRequired,
};

export default MainHeader;
