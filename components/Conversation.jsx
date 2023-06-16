import React from "react";
import PropTypes from "prop-types";

function Conversation(props) {
  return (
    <div className="flex flex-col h-full bg-black/10 rounded-b-xl">
      <div className="h-full">test</div>
      <input
        type="text"
        placeholder="Type a message"
        className="px-4 py-2 mx-6 mb-6 bg-black/[0.05] transition hover:bg-white/5 border border-white/30 border-opacity-50 rounded-xl ring-0 outline-0 placeholder:text-white/75"
      />
    </div>
  );
}

Conversation.propTypes = {};

export default Conversation;
