import Chat from "@model/chat";
import Message from "@model/message";
import User from "@model/user";
import connectDB from "@utils/connectDB";

const createChat = async (participants) => {
  await connectDB();

  const newChat = new Chat({
    participants: participants,
  });

  await newChat.save();
  return newChat._id;
};

const updateChat = async (chat_id, last_message) => {
  await connectDB();

  const chat = await Chat.findById(chat_id);

  const count = await Message.find({ chat_id: chat_id }).count({
    is_read: false,
  });

  chat.last_message = last_message;
  chat.date = new Date();
  chat.unread = count;

  await chat.save();

  return chat;
};

const getChats = async (id) => {
  await connectDB();

  const user = await User.findById(id);

  let chats = await Chat.find({
    "participants._id": user._id,
  });

  return chats;
};

export { createChat, updateChat, getChats };
