import { signin } from "@controller/authController";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const response = await signin(req.body.email, req.body.password);

      if (response.authenticated) {
        // Creating token for user
        const token = jwt.sign(
          {
            id: response.user._id,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "7d",
          }
        );

        res.status(200).json({
          status: 200,
          message: response.message,
          authenticated: true,
          user: response.user,
          accessToken: token,
        });
      } else {
        res.status(response.status).json({ response });
      }
    } catch (error) {
      res.json(error);
    }
  } else {
    res
      .status(400)
      .json({ message: "Invalid method!", method: req.method, status: 400 });
  }
}
