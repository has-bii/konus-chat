import { getChats } from "@controller/chat";
import Chat from "@model/chat";

export default async function sse(req, res) {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("Transfer-Encoding", "chunked");

  const id = req.query["id"].toString();

  // Send an initial SSE event to establish the connection
  res.write(":ok\n\n");

  const sendSSEEvent = (chat) => {
    res.write(`data: ${JSON.stringify(chat)}\n\n`);
  };

  const chats = await getChats(id);

  chats.forEach((chat) => {
    sendSSEEvent(chat);
  });

  const chatChangeStream = Chat.watch();

  chatChangeStream.on("change", (change) => {
    if (change.operationType === "insert") {
      sendSSEEvent(change.fullDocument);
    }
  });

  // chatChangeStream.on("change", (change) => {
  //   if (change.operationType === "insert") {
  //     sendSSEEvent(change.fullDocument);
  //   }
  // });

  res.on("close", () => {
    chatChangeStream.close();
    res.end();
  });
}
