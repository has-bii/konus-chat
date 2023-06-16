import React from "react";
import PropTypes from "prop-types";
import Image from "next/image";

function Profile({ user }) {
  const { name, email, image, username } = user;

  return (
    <div className="flex w-full p-6 border-b-2 border-b-white/[.2] h-fit">
      {/* Image */}
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

      {/* Information */}
      <ul className="w-3/4 pl-4 list-none">
        <li className="w-full text-3xl font-medium truncate">{name}</li>
        <li className="text-xl truncate opacity-75">@{username}</li>
      </ul>
    </div>
  );
}

Profile.propTypes = {
  user: PropTypes.object.isRequired,
};

export default Profile;
