import { setCookie } from "@utils/setCookie";

export default async function handler(req, res) {
  if (req.method === "POST") {
    setCookie(req, res, "JWT", "", {
      httpOnly: true,
      secure: true,
      expires: new Date(0),
      sameSite: "strict",
      path: "/",
    });

    res.json({ message: "Log out", status: 200 });
  } else {
    res.json({ message: "Invalid method", status: 400 });
  }
}
