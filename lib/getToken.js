import User from "@model/user";
import connectDB from "@utils/connectDB";
import jwt from "jsonwebtoken";

const getToken = async (token) => {
  connectDB();
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(decodedToken.id).select({
    fullName: 1,
    email: 1,
  });

  const userJSON = JSON.stringify(user);

  return userJSON;
};

export default getToken;
