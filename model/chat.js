import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  participants: {
    type: Array,
    default: [],
  },
  last_message: {
    type: String,
    default: "",
  },
  unread: {
    type: Number,
    default: 0,
  },
  date: {
    type: Date,
  },
});

const Chat = mongoose.models.Chat || mongoose.model("Chat", chatSchema);

export default Chat;
