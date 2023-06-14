import { signup } from "@controller/authController";

export default async function handler(req, res) {
  if (req.method === "POST") {
    if (!req.body.fullName || !req.body.email || !req.body.password) {
      res.json({
        message: "Error: Full Name, Email and Password are required",
        status: 400,
      });
    }

    const data = await signup(req, res);

    if (!data) {
      res.json({ message: "Error while registering" });
    } else {
      res.json(data);
    }
  } else {
    res.json({ message: "Invalid method!", status: 400 });
  }
}
