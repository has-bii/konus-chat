import React from "react";
import Image from "next/image";
import PropTypes from "prop-types";

function Chats() {
  const chats = [
    { id: 1, last_message: "Hello Bro!", user: { name: "Hasbiy Sender" } },
    { id: 2, last_message: "Whatsappp!", user: { name: "Hasbiy Sender" } },
    { id: 3, last_message: "See you babe 💖", user: { name: "Hasbiy Sender" } },
    { id: 4, last_message: "How are u?", user: { name: "Hasbiy Sender" } },
    { id: 5, last_message: "See yaa 👋", user: { name: "Hasbiy Sender" } },
    { id: 6, last_message: "See yaa 👋", user: { name: "Hasbiy Sender" } },
    { id: 7, last_message: "See yaa 👋", user: { name: "Hasbiy Sender" } },
    { id: 8, last_message: "See yaa 👋", user: { name: "Hasbiy Sender" } },
    { id: 9, last_message: "See yaa 👋", user: { name: "Hasbiy Sender" } },
    { id: 10, last_message: "See yaa 👋", user: { name: "Hasbiy Sender" } },
    { id: 11, last_message: "See yaa 👋", user: { name: "Hasbiy Sender" } },
  ];

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
                  src="/img/profile.jpg"
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
                <div className="text-white text sm">12:55</div>
              </div>
              <div className="flex flex-row items-center w-full gap-4">
                <div className="flex-1 w-12 truncate text-md text-white/75">
                  {chat.last_message}
                </div>
                <div className="w-6 h-6 text-center rounded-full bg-sky-300">
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
