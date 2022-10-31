//jshint esversion:6
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
// const encrypt = require("mongoose-encryption");
// const md5 = require("md5")
// const bcrypt = require("bcrypt");
// const saltRounds = 10;
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require('mongoose-findorcreate');

const app = express();

// console.log(process.env.API_KEY);

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(session({
    secret: "Our little secret.",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb://127.0.0.1:27017/userDB", {useNewUrlParser: true});

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    googleId: String,
    secret: String
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

// userSchema.plugin(encrypt, {secret: process.env.SECRET, encryptedFields: ['password'] });

const User = new mongoose.model("User", userSchema);

passport.use(User.createStrategy());
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());
passport.serializeUser((user, done)=>{
    done(null, user.id);
});

passport.deserializeUser((id,done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/secrets",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
},
(accessToken, refreshToken, profile, cb) => {
    console.log(profile);
    User.findOrCreate({
        googleID: profile.id
    }, (err, user)=>{
        return cb(err, user);
    });
}));

app.get("/auth/google", 
    passport.authenticate("google", { scope: [ "profile" ] })
);

app.get("/auth/google/secrets", 
passport.authenticate('google', { failureRedirect: "/login" }), (req, res)=>{
    res.redirect("/secrets");
});

app.get("/", (req, res) => {
    res.render("home");
});
app.get("/login", (req, res) => {
    res.render("login");
});
app.get("/register", (req, res) => {
    res.render("register");
});

app.get("/secrets", (req, res)=> {
    // if(req.isAuthenticated()){
    //     res.render("secrets");
    // }else{
    //     res.redirect("/login");
    // }
    User.find({"secret": {$ne: null}}, (err, foundUsers)=> {
        if (err) {
            console.log(err);
        }else {
            if (foundUsers) {
                res.render("secrets", {usersWithSecrets: foundUsers});
            }
        }
    });
});

app.get("/submit", (req, res) => {
    if(req.isAuthenticated()){
        res.render("submit");
    }else{
        res.redirect("/login");
    }
});

app.post("/submit", (req, res) => {
    const submittedSecret = req.body.secret;

    User.findById(req.user.id, (err, foundUser) => {
        if (err) {
            console.log(err);
        }else {
            if (foundUser) {
                foundUser.secret = submittedSecret;
                foundUser.save(() => {
                    res.redirect("/secrets");
                });
            }
        }
    });
});

app.get("/logout", (req, res) => {
    req.logout((err)=>{
        if (err) {
            console.log(err);
        }else {
            res.redirect("/");
        }
    });
});

app.post("/register", (req, res)=> {

    User.register({username: req.body.username}, req.body.password, (err, user) => {
        if(err){
            console.log(err);
            res.redirect("/register");
        }else {
            passport.authenticate("local")(req, res, () => {
                res.redirect("/secrets");
            });
        }
    });

    // bcrypt.hash(req.body.password, saltRounds, (err, hash) => {

    //     const newUser = new User({
    //         email: req.body.username,
    //         // password: md5(req.body.password)
    //         password: hash
    //     });
    
    //     newUser.save((err)=> {
    //         if (err) {
    //             console.log(err);
    //         }else{
    //             res.render("secrets");
    //         }
    //     });
    // });

});

app.post("/login", (req, res)=>{

    const user = new User({
        username:req.body.username,
        password: req.body.password
    });

    req.login(user, (err)=> {
        if(err){
            console.log(err);
        }else{
            passport.authenticate("local")(req, res, () => {
                res.redirect("/secrets");
            });
        }
    })

    // const username = req.body.username;
    // // const password = req.body.password;
    // // const password = md5(req.body.password);
    // const password = req.body.password;

    // User.findOne({
    //     email: username
    // }, (err, foundUser) => {
    //     if (err) {
    //         console.log(err)
    //     } else {
    //         if (foundUser) {
    //             bcrypt.compare(password, foundUser.password, (err, result)=>{
    //                 if(result === true){
    //                     res.render("secrets"); 
    //                 }
    //             });
                
    //         }
    //     }
    // });
});





app.listen(3000, ()=>{
    console.log("Servidor rodando na porta 3000.");
}); 
