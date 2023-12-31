const User = require("../models/user-model");
const bcrypt = require("bcryptjs");

/*----------------
HOME LOGIC
------------------ */

const home = async (req, res) => {
  // always use async , we should have to use try and catch , async ke sath use krna chaiye

  try {
    // Paste the logic, or response part
    res.status(200).send("welcome to mern project auth-router");
  } catch (error) {
    console.log(error);
  }
};

/*---------------------------
Register logic

1. GET REGISTRATION DATA: data ko get krege with the help of req.body (user,email,password)
2. CHECK EMAIL EXISTANCE: check if the email is already registered in the db or not.
3. If it is present , simply return hojao with status code
4. HASH password -> securely hash the password.
5. otherwise Create User -> create a new User with Hash password
6. save to DB -> save user data to db
7. Respond - respond with "registration successfull" or handle errors

-----------------------------*/
const register = async (req, res) => {
  try {
    // console.log(req.body); // To get the data, what ever is typed in the frontend, we use req, and body ke andr data aayega
    const { username, email, password, phone } = req.body;

    const userExist = await User.findOne({ email: email }); // 2. User - schema jo bnaya tha Model me import kra usme search krega, and

    if (userExist) {
      return res.status(400).json({ message: "Email already Exists" });
    }

    // HASH THE PASSWORD
    // const saltRound = 10; // salt means kitna complex hash password dena hai, jitna jyda denge utna jyda time consuming ho
    // const hash_password = await bcrypt.hash(password, saltRound);

    const userCreated = await User.create({
      username,
      email,
      password,
      phone,
    });
    res.status(201).json({
      // message: userCreated, Not send the user details on frontend
      message: "Registration Successfull",
      token: await userCreated.generateToken(),
      userId: userCreated._id.toString(),
    });
  } catch (error) {
    res.status(500).json("Internal Server Error");
  }
};

/*=======================================
            USER LOGIN LOGIC
=========================================*/

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 2. check Email Valid or not 
    const userExist = await User.findOne({ email: email });

    // 3. user agr exist nahi krta toh usko pehel bolege ki registered kre then login kre
    if (!userExist) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    // 4. If userExist (toh password ko compare krege), ye jo password, idr compare krre hai, direct isko userSchema me compare krege
    // Try to clean this file
    // const user = await bcrypt.compare(password, userExist.password);

    const user = await userExist.comparePassword(password); // ye password jo abhi user ne enter kiya hai, 
    if (user) {
      res.status(200).json({
        message: "Login Successfull",
        token: await userExist.generateToken(), // mandatory because we need this, make sure idr userExist agr krta hai tabhi Token generate krwana thaa, taki hum client ko send kr ske , authentication and autherization krwa paye
        userId: userExist._id.toString(),
      });
    } else {
      res.status(401).json({
        message: "Invalid Email or Password",
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { home, register, login };
