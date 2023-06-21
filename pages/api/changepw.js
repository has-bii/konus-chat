import changePW from "@controller/changePassword";

export default async function handler(req, res) {
  if (req.method === "POST") {
    if (!req.body.newPw && !req.body.id) {
      res.status(400).json({
        ok: false,
        message: "Password is required",
      });
    }

    try {
      const data = await changePW(req.body.newPw, req.body.id);

      res.json(data);
    } catch (error) {
      res.status(400).json(error);
    }
  } else {
    res.status(400).json({
      message: "Invalid request method!",
    });
  }
}
