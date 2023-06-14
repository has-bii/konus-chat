const { default: mongoose } = require("mongoose");

const connectDB = async () => {
  try {
    console.log("Connecting to DB");

    await mongoose
      .connect(process.env.MONGODB_URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      })
      .then(() => {
        console.log("Connected to DB");
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
