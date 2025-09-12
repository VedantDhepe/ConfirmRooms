
if(process.env.NODE_ENV != "production"){
require("dotenv").config();
}
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL, // React app URL
    credentials: true, // allow cookies to be sent
  })
);
const mongoose = require('mongoose');
const Listing = require('./models/listing.js') 
// const wrapAsync = require('./utils/wrapAsync.js');
// const ExpressError = require("./utils/ExpressError.js")
const {listingSchema, reviewSchema} = require('./schema.js');
const Review = require('./models/review.js');
 
const listingRouter = require('./Routes/listing.js');
const reviewRouter = require('./Routes/review.js');
const userRouter = require('./Routes/user.js');

const session = require("express-session")
const MongoStore = require("connect-mongo");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");




const port = process.env.PORT || 8080;



const db_URL = process.env.ATLASDB_URL;
main().then((req,res) => {console.log("Connected to DataBase Successfully")}).catch((err) => {console.log("Error in connecting to DataBase" + err)});
async function main() {
    await mongoose.connect(db_URL); 
} 

const store = MongoStore.create({
    mongoUrl : db_URL,
    crypto : {
        secret : process.env.SESSION_SECRET,
    },
    touchAfter : 24 * 60 * 60, // 24 Hours.
})

const sessionOption = {
    store,  
    secret : process.env.SESSION_SECRET,
    resave : false,
    saveUninitialized : true,
    cookie : {
        expires : Date.now() + 7 * 1000 * 60 * 60 * 24,
        secure: process.env.NODE_ENV === "production",
        maxAge : 7 * 1000 * 60 * 60 * 24,
        httpOnly : true,
    }
}
app.use(session(sessionOption));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());




app.use('/listing/:id/review', reviewRouter);
app.use('/listing', listingRouter);
app.use('/user', userRouter)
 



app.get('/', (req,res) => { 
    res.redirect("/listing");
})
app.all("*", (req,res, next) =>{
    next(new ExpressError(404, "Page not Found!"));
});  

// app.use((err,req,res,next)=>{ // What will happen if we remove next  from this 
//     let { message = "Some Error Occured"} = err;
//     let {status = 400} = err;
//     // res.status(status).send(message);
//      res.status(status).render('error.ejs', {status, message});
// });



app.listen(port, () =>{ 
    console.log("Server is running on port " + port);
});  
