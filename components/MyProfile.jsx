import React, { useState } from "react";
import PropTypes from "prop-types";
import Image from "next/image";

function MyProfile({ user }) {
  const [form, setForm] = useState({
    name: user.name,
    username: user.username,
    email: user.email,
  });
  const [isEdit, setEdit] = useState(false);

  const handleEdit = () => {
    setEdit(!isEdit);
  };

  return (
    <div className="flex flex-col w-full overflow-hidden h-full backdrop-blur-sm bg-white/[.15] rounded-xl">
      <div className="px-8 py-6 text-3xl font-bold text-white bg-white/20 border-b border-white/[.15]">
        Account Settings
      </div>
      <div className="flex flex-row flex-1 p-6">
        {/* List */}
        <div className="flex flex-col w-48">
          <ul className="list-none">
            <li className="px-4 py-2 my-2 font-medium bg-white/20 rounded-xl hover:bg-white/20">
              <button>My Profile</button>
            </li>
            <li className="px-4 py-2 my-2 font-medium text-red-500 rounded-xl hover:bg-white/20">
              <button>Delete Account</button>
            </li>
          </ul>
        </div>

        {/* Selected Menu */}
        <div className="flex flex-col w-full h-full gap-4 px-8 ml-8 border-l border-white/10 grow">
          {/* Personal Information */}
          <section>
            <div className="mb-4 text-xl font-semibold text-white">
              My Profile
            </div>
            <div className="flex flex-row w-full gap-6 p-6 bg-white/20 h-fit rounded-xl">
              {/* Image */}
              <div className="flex">
                <div className="relative w-24 h-24 overflow-hidden rounded-xl ring-4 ring-teal-500">
                  <Image
                    src={user.image ? user.image : "/img/profile.jpg"}
                    fill={true}
                    alt="Profile"
                    sizes="(max-width: 768px) 100vw"
                    quality={50}
                    style={{ objectFit: "cover" }}
                  />
                </div>
              </div>

              {/* Name */}
              <div className="flex items-center">
                <ul className="content-center list-none h-fit">
                  <li className="text-3xl font-semibold text-white">
                    {user.name}
                  </li>
                  <li className="text-lg text-white/70">{user.email}</li>
                  <li className="text-lg text-white/70">@{user.username}</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Personal Information */}
          <div className="flex flex-col w-full gap-6 p-6 bg-white/20 h-fit rounded-xl">
            <div className="inline-flex items-center gap-4">
              <div className="text-xl font-medium">Personal Information</div>
              <button
                onClick={handleEdit}
                className="inline-flex self-center gap-2 px-4 py-2 transition bg-white rounded-full group hover:bg-sky-400"
              >
                <div className="self-center font-medium text-black group-hover:text-white">
                  {isEdit ? "Save" : "Edit"}
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="black"
                  className="w-6 h-6 group-hover:stroke-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                  />
                </svg>
              </button>
            </div>

            <div className="flex flex-row w-full">
              {/* Left */}
              <div className="flex flex-col w-full">
                <label className="flex flex-col mb-6 text-lg font-light w-fit">
                  Full Name
                  {!isEdit && (
                    <p name="name" className="py-2 mt-2 text-xl font-semibold">
                      {user.name}
                    </p>
                  )}
                  {isEdit && (
                    <input
                      type="text"
                      className="px-4 py-2 mt-2 text-xl font-semibold rounded-lg placeholder:text-white/60 placeholder:font-normal bg-black/30 outline-0"
                      value={form.name}
                      placeholder="Enter full name"
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                    />
                  )}
                </label>
                <label className="flex flex-col mb-6 text-lg font-light w-fit">
                  Email Address
                  {!isEdit && (
                    <p name="name" className="py-2 mt-2 text-xl font-semibold">
                      {user.email}
                    </p>
                  )}
                  {isEdit && (
                    <input
                      type="text"
                      className="px-4 py-2 mt-2 text-xl font-semibold rounded-lg placeholder:text-white/60 placeholder:font-normal bg-black/30 outline-0"
                      value={form.email}
                      placeholder="Enter valid email address"
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                    />
                  )}
                </label>
              </div>

              {/* Right */}
              <div className="flex flex-col w-full">
                <label className="flex flex-col mb-6 text-lg font-light w-fit">
                  Username
                  {!isEdit && (
                    <p name="name" className="py-2 mt-2 text-xl font-semibold">
                      @{user.username}
                    </p>
                  )}
                  {isEdit && (
                    <input
                      type="text"
                      className="px-4 py-2 mt-2 text-xl font-semibold rounded-lg placeholder:text-white/60 placeholder:font-normal bg-black/30 outline-0"
                      value={form.username}
                      placeholder="Enter username without @"
                      onChange={(e) =>
                        setForm({ ...form, username: e.target.value })
                      }
                    />
                  )}
                </label>
                <label className="flex flex-col mb-6 text-lg font-light w-fit">
                  Change Photo
                  <input
                    type="file"
                    className="mt-2 file:transition file:font-semibold file:hover:bg-black file:hover:text-white file:mt-2 file:text-base file:rounded-full file:border-0 file:px-4 file:py-2 file:mr-4"
                    accept="image/*"
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

MyProfile.propTypes = {
  user: PropTypes.object.isRequired,
};

export default MyProfile;
