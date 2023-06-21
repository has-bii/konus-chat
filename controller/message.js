import connectDB from "@utils/connectDB";
import Message from "@model/message";
import { createChat, updateChat } from "@controller/chat";
import User from "@model/user";

const sendMessage = async (req) => {
  await connectDB();

  let { text, chat_id, sender_id, rec_id } = req.body;

  if (!chat_id) {
    const sender = await User.findById(sender_id).select(
      "name username image _id"
    );
    const rec = await User.findById(rec_id).select("name username image _id");

    const participants = [sender, rec];

    chat_id = await createChat(participants);
  }

  const message = await new Message({
    text: text,
    chat_id: chat_id,
  });

  await message.save();

  const chat = await updateChat(chat_id, message.text);

  return { message, chat };
};

const getMessage = async (chat_id) => {
  await connectDB();

  const messages = await Message.find({ chat_id: chat_id }).select(
    "_id text chat_id is_read date"
  );

  const count = await Message.count({ is_read: false });

  console.log(count);

  return {
    messages,
    count,
  };
};

export { sendMessage, getMessage };
