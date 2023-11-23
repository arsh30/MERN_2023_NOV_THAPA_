/*----------------------
express.Router
----------------------*/

/*
1. express.Router is a class to create modular, mountable route handler, A router instance is a complete
middleware and routing system, for this reason, it is often refered to as a "mini-app"


2. In express.js, express.Router() is a mini Express Application without all the server configurations but with the ability
to define the routes, middleware, and even have its own set of route handlers, it allows you to modularize your routes
and middleware to keep your code organized and maintable

*/

// EXAMPLE OF THE ABOVE 2 POINTS: BELOW:

const express = require("express");
const router = express.Router(); // means in 2nd point, route bnane ke liye server ki sari configuration nahi krni hogi, jo route ko define krege
//  like we did in server.js file, udr app.get kr, rahe the, so idr express.Router() class ka use krege to create Routes

// NEW CODE, WE ARE USING ROUTER, TO CREATE NEW ROUTES
// router.get("/", (req, res) => {
//   res.status(200).send("welcome to mern project auth-router");
// });

// or - Another way to use router.route.get -> Preffered way to use because we can do chaining as well agr post ki request bnani hoye

const authcontrollers = require("../controllers/auth-controller");

router.route("/").get(authcontrollers.home);

router.route("/register").post(authcontrollers.register);
router.route("/login").post(authcontrollers.login);

module.exports = router;
