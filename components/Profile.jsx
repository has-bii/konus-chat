import React from "react";
import PropTypes from "prop-types";
import Image from "next/image";

function Profile({ user }) {
  const { name, email, image } = user;

  return (
    <div className="flex w-full gap-4 h-fit">
      {/* Image */}
      <div className="relative w-16 h-16 overflow-hidden rounded-full">
        <Image
          src="/img/profile.jpg"
          fill={true}
          alt="Profile"
          quality={50}
          style={{ objectFit: "cover" }}
        />
      </div>

      {/* Information */}
      <ul className="w-3/4 list-none">
        <li className="text-3xl font-medium truncate">{name}</li>
        <li className="text-xl truncate opacity-75">{email}</li>
      </ul>
    </div>
  );
}

Profile.propTypes = {
  user: PropTypes.object.isRequired,
};

export default Profile;
