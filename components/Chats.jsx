import React, { useEffect, useState } from "react";
import Image from "next/image";
import PropTypes from "prop-types";

function Chats({ chats = [] }) {
  return (
    <>
      <div className="overflow-y-auto no-scrollbar">
        {chats.map((chat) => (
          <a
            key={chat.id}
            href="#"
            className="flex items-center justify-center p-4 m-2 overflow-hidden transition rounded-xl bg-black/10 hover:bg-black/20"
          >
            {/* Image */}
            <div className="flex">
              <div className="relative w-16 h-16 mr-2 overflow-hidden rounded-full">
                <Image
                  src={chat.user.image ? chat.user.image : "/img/profile.jpg"}
                  fill={true}
                  alt="Profile"
                  sizes="(max-width: 768px) 100vw"
                  quality={50}
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>

            {/* Chat */}
            <div className="flex flex-col w-full">
              <div className="flex flex-row items-end w-full gap-4">
                <div className="flex-1 w-12 text-2xl font-medium text-white truncate">
                  {chat.user.name}
                </div>
                <div className="text-white text sm">{chat.date}</div>
              </div>
              <div className="flex flex-row items-center w-full gap-4">
                <div className="flex-1 w-12 truncate text-md text-white/75">
                  {chat.last_message}
                </div>
                <div className="w-6 h-6 text-center bg-red-500 rounded-full">
                  <span>5</span>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </>
  );
}

Chats.propTypes = {};

export default Chats;
