const User = require("../models/user");
const passport = require("passport");

//Create User
module.exports.createUser = async (req, res, next) =>{
    try{
        let {username, email, password} = req.body;
    const newUser = new User({username,email,password});
    const registeredUser = await User.register(newUser, password);
    req.login(registeredUser, (err)=>{
        if(err){
            return next(err);
        } 
          res.json({user : registeredUser});
    });
    }
    catch(err){
        // req.flash("error", "Username is already used by someone. Please try something else");
        // res.redirect("/user/signup");
        res.json({ error : "Username is already used by someone. Please try something else" });
    }
};



//Login Route
module.exports.loginUser = async (req, res, next) => {

  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);  // internal error
    if (!user) {
      // authentication failed
      return res
        .status(401)
        .json({ success: false, message: info.message || "Login failed" });
    }

    // login the user (establish session)
    req.logIn(user, (err) => {
      if (err) return next(err);
      console.log(user.username);
      console.log(req.isAuthenticated())
      // success: return user info as JSON
      return res.json(user);
    });
  })(req, res, next);
};

//Logout User 

module.exports.logoutUser = (req,res, next) => {
    const response = req.logout( (err) =>{
        if(err){
          return next(err);
        }
        res.json({status : "success"})
    })
};
