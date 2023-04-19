//jshint esversion:6
// This is file works on the rest api.
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.set('view engine', 'ejs');

mongoose.connect("mongodb://localhost:27017/blogDB");

// const values for displaying

const contact = "If you have any questions, feedback, or inquiries about our recipe website, we would love to hear from you! You can easily get in touch with us through multiple channels. You can fill out our contact form on the website, send us an email at [email protected], connect with us on social media platforms such as Facebook, Instagram, and Twitter, or chat with us through our live chat feature. We are committed to providing excellent customer service and are always ready to assist you. Don't hesitate to reach out to us, and we look forward to hearing from you!";
const about = "Welcome to our recipe website! We're glad you're here. Our website is all about sharing delicious recipes from various cuisines, featuring a wide range of dishes that are easy to prepare at home. Whether you're a seasoned chef or a beginner in the kitchen, our website has something for everyone.";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// schema
const postSchema = new mongoose.Schema({
    title: String,
    content: String,
    photo: String
});

// model
const Post = mongoose.model("Post", postSchema);

//home page
app.get("/", function(req, res) {
    Post.find()
        .then(function(foundItems) {
            res.render("home.ejs", { postedItems: foundItems });
        })
        .catch(function(error) {
            res.status(500).send(error);
        });

});

//about page
app.get("/about", function(req, res) {
    res.render('about', { about: about });
});

//rendering individual content
app.get("/post/:postname", function(req, res) {
    const requestedPostId = req.params.postname;

    Post.findOne({ title: requestedPostId })
        .then((post) => {
            res.render("post", { title: post.title, content: post.content, photo: post.photo });
        })
        .catch((err) => {
            res.status(500).send(err);
        });
});

//contact page
app.get("/contact", function(req, res) {
    res.render('contact', { contact: contact });
});

//compose page
app.get("/compose", function(req, res) {
    res.render("compose");
});

//storing data to database
app.post("/compose", function(req, res) {
    const post = new Post({
        title: req.body.title,
        content: req.body.content,
        photo: req.body.photo
    });

    post.save()
        .then(function() {
            res.redirect("/");
        })
        .catch(function(error) {
            res.status(500).send(error);
        });
});

//deleting content using rest api
app.delete("/post/:postname", function(req, res) {
    const requestedPostId = req.params.postname;

    Post.findOneAndDelete({ title: requestedPostId })
        .then((post) => {
            console.log(post);
            res.send("/succesfully deleted ");
        })
        .catch((err) => {
            res.status(500).send(err);
        });
});

//puting the data
app.put("/post/:postname", function(req, res) {
    const requestedPostId = req.params.postname;

    Post.findOneAndDelete({ title: requestedPostId })
        .then((post) => {
            console.log(post);
            res.send("/succesfully puted data ");
        })
        .catch((err) => {
            res.status(500).send(err);
        });
});

//patching data
app.patch("/post/:postname", function(req, res) {
    const requestedPostId = req.params.postname;

    Post.findOneAndDelete({ title: requestedPostId })
        .then((post) => {
            console.log(post);
            res.send("/succesfully patched ");
        })
        .catch((err) => {
            res.status(500).send(err);
        });
});

app.listen(3000, function() {
    console.log("Server started on port 3000");
});