const mongoose = require("mongoose");

// const URI = "mongodb+srv://arshdeep30:Arshdeep123@cluster0.ms0ehyf.mongodb.net/"; // Jo last me likha hai, ie our clustor naem
// THE URI, IS COMES AFTER SETTING THE INFO IN ATLAS, AND RUN COMMAND IE "MONGOSH" To get the link

const URI = process.env.MONGODB_URI;
// mongoose.connect(URI);

const connectDb = async () => {
  try {
    await mongoose.connect(URI);
    console.log("connection successful to DB");
  } catch (error) {
    console.log("Database connection is failed");
    process.exit(0);
  }
};

module.exports = connectDb;
