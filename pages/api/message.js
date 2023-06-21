import { sendMessage, getMessage } from "@controller/message";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const response = await sendMessage(req);

    res.status(200).json({ response });
  } else if (req.method === "GET") {
    const chat_id = req.query["chat_id"].toString();

    const messages = await getMessage(chat_id);

    res.status(200).json({ data: messages });
  } else {
    res.status(400).json({
      message: "Invalid request method!",
    });
  }
}
