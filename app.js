const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const Campground = require("./models/campground");
const Comment = require("./models/comment");
const User = require("./models/user");

mongoose
  .connect("mongodb://localhost/campgrounddb", { useNewUrlParser: true })
  .then(() => {
    console.log("connected to mongo db...");
  })
  .catch(error => {
    console.log("could not connect to mongo db");
  });

app = express();
app.use(express.static(__dirname + "/public"));
//allow us to get the request.body object
app.use(bodyParser.urlencoded({ extended: true }));
//allow us to send ejs file to user
app.set("view engine", "ejs");
const port = process.env.PORT || 3000;
function storeNotice() {
  console.log(`To buy anything from our store call: ${port}`);
}
app.listen(port, storeNotice);
app.get(
  "/",

  (req, res) => {
    res.render("landing");
  }
);

app.get(
  "/campgrounds",

  (req, res) => {
    async function findCamps() {
      const campgrounds = await Campground.find();
      res.render("campgrounds/index", { campgrounds });
    }
    findCamps();
  }
);

app.post(
  "/campgrounds",

  (req, res) => {
    //the inputedText
    const name = req.body.name;
    //the value of the name attribute of the second input tag
    const image = req.body.image;
    const description = req.body.description;
    //post the new object into the campgrounds database
    const campground = new Campground({
      name: name,
      image: image,
      description: description
    });
    campground.save();
    //redirect to the get request of /campgrounds  when the form is submitted
    res.redirect("/campgrounds");
  }
);

app.get(
  "/campgrounds/new",

  (request, response) => {
    response.render("campgrounds/new");
  }
);

app.get(
  "/campgrounds/:id",

  (request, response) => {
    async function showMoreInfo() {
      const foundcamp = await Campground.findById(request.params.id);
      response.render("campgrounds/show", { foundcamp });
    }
    showMoreInfo();
  }
);

//==============comments routes==============

app.get("/campgrounds/:id/comments/new", async function(req, res) {
  ///nbjjjjkhjkhjkhk
  const campground = await Campground.findById(req.params.id);
  res.render("comments/new", { campground });
});

app.post(
  "/campgrounds/:id/comments",

  async function(req, res) {
    //lookup campground usind ID
    try {
      const campground = await Campground.findById(req.params.id);

      if (campground) {
        const comment = new Comment(req.body.comment);
        campground.comments.push(comment);
        campground.save();
        res.redirect("/campgrounds/" + campground._id);
      }
    } catch (error) {
      console.log(error);
      res.redirect("/campgrounds");
    }

    // create new comment
    // connect new comment to campground
    //redirect to campground show page
  }
);
