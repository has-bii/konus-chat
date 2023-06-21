import { getChats } from "@controller/chat";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const id = req.query["id"].toString();

    const response = await getChats(id);

    return res.json(response);
  } else {
    res.status(400).json({
      message: "Invalid request method!",
    });
  }
}
