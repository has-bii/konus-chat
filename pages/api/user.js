import { getUser } from "@controller/user";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const users = await getUser();

    res.status(200).json(users);
  } else {
    res.status(400).json({
      message: "Invalid request method!",
    });
  }
}
