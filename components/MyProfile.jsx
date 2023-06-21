import React, { useState } from "react";
import PropTypes from "prop-types";
import PersonalInfo from "./PersonalInfo";
import ChangePw from "./ChangePw";
import MainHeader from "./MainHeader";

function MyProfile({ user }) {
  const [menutoggle, setMenutoggle] = useState("myprofile");

  return (
    <div className="flex flex-col overflow-x-hidden w-full h-full no-scrollbar backdrop-blur-sm bg-white/[.15] lg:rounded-xl">
      {/* <div className="px-8 py-6 text-3xl font-bold text-white bg-white/20 border-b border-white/[.15]">
        Account Settings
      </div> */}
      <MainHeader title="Account Settings" />
      <div className="flex flex-col flex-1 lg:flex-row">
        {/* List */}
        <ul className="flex flex-row gap-2 p-6 overflow-x-auto list-none h-fit no-scrollbar lg:flex-col">
          <li
            className={`px-4 py-2 transition font-medium rounded-xl shrink-0 hover:bg-white/20 ${
              menutoggle === "myprofile" ? "bg-white/20" : ""
            }`}
          >
            <a href="#" onClick={() => setMenutoggle("myprofile")}>
              My profile
            </a>
          </li>
          <li
            className={`px-4 py-2 transition font-medium rounded-xl shrink-0 hover:bg-white/20 ${
              menutoggle === "changepw" ? "bg-white/20" : ""
            }`}
          >
            <a href="#" onClick={() => setMenutoggle("changepw")}>
              Change password
            </a>
          </li>
          <li className="px-4 py-2 font-medium text-red-500 transition shrink-0 h-fit rounded-xl hover:bg-red-500/50 hover:text-white">
            <button>Delete account</button>
          </li>
        </ul>

        {/* Selected Menu */}
        <div className="flex flex-col gap-4 p-6 lg:h-full h-fit lg:w-auto lg:border-l lg:px-8 lg:border-white/10 grow">
          {menutoggle === "myprofile" && <PersonalInfo user={user} />}
          {menutoggle === "changepw" && <ChangePw user={user} />}
        </div>
      </div>
    </div>
  );
}

MyProfile.propTypes = {
  user: PropTypes.object.isRequired,
};

export default MyProfile;
