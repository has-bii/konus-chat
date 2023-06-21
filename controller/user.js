const { default: User } = require("@model/user");
const { default: connectDB } = require("@utils/connectDB");

const getUser = async () => {
  try {
    await connectDB();

    const users = await User.find().select("_id name username image");

    return users;
  } catch (error) {
    console.error(error);
  }
};

export { getUser };
