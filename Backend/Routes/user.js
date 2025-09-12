const express = require("express");
const passport = require("passport");
const User = require("../models/user.js");
const {saveRedirectUrl} = require("../middleware.js");
const router = express.Router();
const userController = require('../controller/users.js');
// const wrapAsync = require("../utils/wrapAsync.js");



router.route('/signup')

    

    // Create new User(signup)
    .post(
         userController.createUser
    );


router.route('/login')
    // Render Login Form
    

    // Login User
    .post(
        userController.loginUser

    );

router.route("/logout")

    //Logout User
    .get(
    userController.logoutUser
    );

module.exports = router;
