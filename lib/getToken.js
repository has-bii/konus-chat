import User from "@model/user";
import connectDB from "@utils/connectDB";
import jwt from "jsonwebtoken";

const getToken = async (token) => {
  await connectDB();
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(decodedToken.id).select({
    name: 1,
    email: 1,
  });

  const userJSON = JSON.stringify(user);

  return userJSON;
};

export default getToken;
