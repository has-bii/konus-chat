import React from "react";
import PropTypes from "prop-types";

function Conversation() {
  const user = { id: 1 };

  const messages = [
    // { id: 1, body: "Hi👋", user: { id: "1" } },
    // { id: 2, body: "Hello👋", user: { id: "2" } },
    // { id: 3, body: "Whats up?", user: { id: "1" } },
    // { id: 4, body: "Good bro!", user: { id: "2" } },
    // { id: 5, body: "Wanna hangout?", user: { id: "1" } },
    // { id: 6, body: "Absolutely!", user: { id: "2" } },
    // { id: 7, body: "Absolutely!", user: { id: "1" } },
    // { id: 8, body: "Absolutely!", user: { id: "2" } },
    // { id: 9, body: "Absolutely!", user: { id: "1" } },
    // { id: 10, body: "Absolutely!", user: { id: "1" } },
    // { id: 11, body: "Absolutely!", user: { id: "2" } },
    // { id: 12, body: "Absolutely!", user: { id: "1" } },
    // { id: 13, body: "Absolutely!", user: { id: "2" } },
    // { id: 14, body: "Absolutely!", user: { id: "1" } },
    // { id: 15, body: "Absolutely!", user: { id: "2" } },
  ];

  return (
    <div className="flex flex-col-reverse h-full bg-black/10 rounded-b-xl">
      <div className="flex flex-row gap-3 px-6 py-6 border-t border-t-white/[.2] bg-white/10">
        <input
          type="text"
          placeholder="Type a message"
          className="px-4 py-2 w-full bg-white/[0.1] transition hover:bg-white/20 placeholder:opacity-80 border border-white/30 border-opacity-50 rounded-xl ring-0 outline-0 placeholder:text-white/75"
        />
        <button className="flex-shrink p-2 border group border-white/30 rounded-xl transition bg-white/[0.1] hover:bg-white/20">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.2}
            className="w-6 h-6 transition -rotate-45 group-hover:stroke-white/75 group-hover:stroke-2 stroke-white/50"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
            />
          </svg>
        </button>
      </div>
      <div className="flex flex-col-reverse px-6 overflow-y-auto grow h-96 no-scrollbar scroll-smooth">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`${
              message.user.id == user.id ? "self-end bg-rose-500" : "bg-sky-500"
            }  px-4 py-2 w-fit rounded-xl my-3 flex flex-col`}
          >
            <div>{message.body}</div>
            <div className="self-end -mt-1 text-sm font-light opacity-75">
              12:55
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

Conversation.propTypes = {};

export default Conversation;
