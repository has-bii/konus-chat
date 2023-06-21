import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, "Text is required!"],
  },
  chat_id: {
    type: mongoose.Types.ObjectId,
    required: [true, "Chat id is required!"],
  },
  date: {
    type: Date,
    default: Date.now,
  },
  is_read: {
    type: Boolean,
    default: false,
  },
});

const Message =
  mongoose.models.Message || mongoose.model("Message", messageSchema);

export default Message;
