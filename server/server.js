require("dotenv").config();
const express = require("express");
const app = express();

const router = require("./router/auth-router");
const connectDb = require("./utils/db"); // connect DB returns a promise

// Middleware - express.json -> taki jo bhi body me bhjege, usko get kar ske very very important
app.use(express.json());

app.use("/api/auth", router);

const PORT = 5000;
connectDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running at port: ${PORT}`);
    });
  })
  .catch(() => {
    console.log("ERROR");
  });
