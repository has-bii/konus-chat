import React from "react";
import PropTypes from "prop-types";
import { useState } from "react";
import Image from "next/image";
import Alert from "./Alert";

function PersonalInfo({ user }) {
  const [form, setForm] = useState({
    name: user.name,
    username: user.username,
    email: user.email,
  });
  const [isEdit, setEdit] = useState(false);
  const [image, setImage] = useState(null);
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState({
    message: "",
    ok: false,
  });

  const handleEdit = () => {
    setEdit(!isEdit);
  };

  const sendMessage = (message, status) => {
    setMessage({
      message: message,
      ok: status,
    });
  };

  const showMessage = (status) => {
    setShow(status);
  };

  return (
    <>
      {/* Profile */}
      <section>
        <div className="mb-4 text-xl font-semibold text-white">My Profile</div>
        <div className="flex flex-col w-full gap-6 p-6 lg:flex-row bg-white/20 h-fit rounded-xl">
          {/* Image */}
          <div className="flex">
            <div className="relative w-full overflow-hidden h-52 lg:w-24 lg:h-24 rounded-xl ring-4 ring-teal-500">
              <Image
                src={user.image ? user.image : "/img/profile.jpg"}
                fill={true}
                alt="Profile"
                sizes="(max-width: 768px) 100vw"
                quality={30}
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>

          {/* Name */}
          <div className="flex items-center">
            <ul className="content-center list-none h-fit">
              <li className="text-3xl font-semibold text-white">{user.name}</li>
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
            className="inline-flex self-center gap-2 px-4 py-2 transition bg-white rounded-xl group hover:bg-sky-400"
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

        <div className="flex flex-col w-full lg:flex-row">
          {/* Left */}
          <div className="flex flex-col w-full">
            <label className="flex flex-col w-auto mb-6 text-lg font-light lg:w-fit">
              Full Name
              {!isEdit && (
                <p name="name" className="py-2 text-xl font-semibold">
                  {user.name}
                </p>
              )}
              {isEdit && (
                <input
                  type="text"
                  className="w-auto px-4 py-2 text-xl rounded-lg placeholder:text-white/60 placeholder:font-normal bg-black/30 outline-0"
                  value={form.name}
                  placeholder="Enter full name"
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              )}
            </label>
            <label className="flex flex-col w-auto mb-6 text-lg font-light lg:w-fit">
              Email Address
              {!isEdit && (
                <p name="name" className="py-2 text-xl font-semibold">
                  {user.email}
                </p>
              )}
              {isEdit && (
                <>
                  <input
                    type="text"
                    className="px-4 py-2 text-xl rounded-lg disabled:cursor-not-allowed disabled:text-white/80 placeholder:text-white/60 placeholder:font-normal bg-black/30 outline-0"
                    value={form.email}
                    placeholder="Enter valid email address"
                    disabled
                  />
                  <span className="mt-2 text-sm font-semibold text-red-600">
                    Email can't be changed
                  </span>
                </>
              )}
            </label>
          </div>

          {/* Right */}
          <div className="flex flex-col w-full">
            <label className="flex flex-col w-auto mb-6 text-lg font-light lg:w-fit">
              Username
              {!isEdit && (
                <p name="name" className="py-2 text-xl font-semibold">
                  @{user.username}
                </p>
              )}
              {isEdit && (
                <input
                  type="text"
                  className="px-4 py-2 text-xl rounded-lg placeholder:text-white/60 placeholder:font-normal bg-black/30 outline-0"
                  value={form.username}
                  placeholder="Enter username without @"
                  onChange={(e) =>
                    setForm({ ...form, username: e.target.value })
                  }
                />
              )}
            </label>
            {/* <label className="flex flex-col w-auto mb-6 text-lg font-light lg:w-fit">
              Change Photo
              <input
                onChange={uploadToClient}
                type="file"
                className=" file:transition file:font-semibold file:hover:bg-black file:hover:text-white file:mt-2 file:text-base file:rounded-xl file:border-0 file:px-4 file:py-2 file:mr-4"
                accept="image/jpg, image/jpeg, image/png"
              />
            </label> */}
          </div>
        </div>
      </div>
      <Alert alert={message} show={show} func={setShow} />
    </>
  );
}

PersonalInfo.propTypes = {
  user: PropTypes.object.isRequired,
};

export default PersonalInfo;
