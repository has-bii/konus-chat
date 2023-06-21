import User from "@model/user";
import bcrypt from "bcrypt";
import connectDB from "@utils/connectDB";

async function changePW(newPw, id) {
  await connectDB();

  const userDB = await User.findById(id);

  if (!userDB)
    return {
      message: "User not found!",
      ok: false,
    };

  userDB.password = bcrypt.hashSync(newPw, 12);

  await userDB.save();
  return {
    ok: true,
    message: "Password has been changed.",
  };
}

export default changePW;
