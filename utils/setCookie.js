import cookie from "cookie";

export const setCookie = (req, res, name, value, options = {}) => {
  res.setHeader("Set-Cookie", cookie.serialize(name, value, options));

  console.log("Cookie has been set!");
};
