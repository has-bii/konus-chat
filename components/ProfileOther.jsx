import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import Image from "next/image";

function ProfileOther({ user }) {
  const { name, email, image, username } = user;
  const searchRef = useRef();

  return (
    <div className="flex w-full items-center p-6 border-b border-b-white/[.2] bg-white/10 rounded-t-xl h-fit">
      {/* Image */}
      <div className="flex">
        <div className="relative w-16 h-16 overflow-hidden rounded-full ring-4 ring-white/20">
          <Image
            src="/img/profile.jpg"
            fill={true}
            alt="Profile"
            sizes="(max-width: 768px) 100vw"
            quality={50}
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>

      {/* Information */}
      <ul className="w-full pl-4 list-none">
        <li className="w-full text-3xl font-medium truncate">{name}</li>
        <li className="text-xl truncate opacity-75">@{username}</li>
      </ul>

      <input
        id="search-input"
        type="text"
        ref={searchRef}
        placeholder="Search message"
        className="px-4 py-2 mx-4 h-10 focus:bg-black/10 bg-black/[0.05] transition border border-white/30 border-opacity-50 rounded-xl ring-0 outline-0 placeholder:text-white/75"
      />

      <button className="mr-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-8 h-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
      </button>
    </div>
  );
}

ProfileOther.propTypes = {
  user: PropTypes.object.isRequired,
};

export default ProfileOther;
