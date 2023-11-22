const User = require("../models/user-model");

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
    res
      .status(200)
      .json({
        // message: userCreated, Not send the user details on frontend
        message:"Registration Successfull",
        token: await userCreated.generateToken(),
        userId: userCreated._id.toString(),
      });
  } catch (error) {
    res.status(500).json("Internal Server Error");
  }
};

module.exports = { home, register };
