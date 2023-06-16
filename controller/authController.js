import User from "@model/user";
import connectDB from "@utils/connectDB";
import bcrypt from "bcrypt";

const signin = async (email, password) => {
  if (!email || !password) {
    return {
      status: 400,
      authenticated: false,
      message: "Email and password are required!",
    };
  }

  await connectDB();

  const user = await User.findOne({ email: email });

  if (!user) {
    return {
      status: 400,
      authenticated: false,
      message: "User does not exist!",
    };
  }

  // Check if exists
  const checkPass = bcrypt.compareSync(password, user.password);

  // If password invalid
  if (!checkPass)
    return {
      status: 400,
      authenticated: false,
      message: "Password is invalid!",
    };

  const verifiedUser = await User.findOne({ email: email }).select(
    "_id name email"
  );

  const data = {
    status: 200,
    authenticated: true,
    user: verifiedUser,
    message: "Authentication is successful",
  };

  return data;
};

const signup = async (req, res) => {
  await connectDB();

  var username = req.body.name.toLowerCase().replace(" ", "");

  const user = new User({
    name: req.body.name.toLowerCase(),
    email: req.body.email,
    username: username,
    password: bcrypt.hashSync(req.body.password, 12),
  });

  const findUser = await User.findOne({ email: req.body.email });

  if (findUser) {
    return { message: "Email already exists!", status: 400 };
  }

  const savingUser = await user.save();
  return { message: "User has been created", status: 200, user: savingUser };
};

module.exports = { signin, signup };
