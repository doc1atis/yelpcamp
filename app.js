//allow us to get the request.body object
const bodyParser = require("body-parser");

//how to connect to mongo db

const mongoose = require("mongoose");

// this is a requestName(specifier) that returns a requestName (promise)

mongoose
  .connect("mongodb://localhost/campgrounddb", { useNewUrlParser: true })
  .then(() => {
    console.log("connected to mongo db...");
  })
  .catch(error => {
    console.log("could not connect to mongo db");
  });

const campgrounds = [
  {
    name: "salmon",
    image:
      "https://images.unsplash.com/photo-1480835382106-d1923af88f3f?ixlib=rb-0.3.5&s=b82df7a3cf94bf4fcdc3d7ed16c20fc6&dpr=2&auto=format&fit=crop&w=225&q=60"
  },
  {
    name: "gran",
    image:
      "https://images.unsplash.com/photo-1481391145929-5bcf567d5211?ixlib=rb-0.3.5&s=217357c137488d8137d4f44e374595bd&dpr=2&auto=format&fit=crop&w=225&q=60"
  },
  {
    name: "mount",
    image:
      "https://images.unsplash.com/photo-1506442066112-31d53aa2c1d8?ixlib=rb-0.3.5&s=280ddaf4ec1ea4e0d27a67c7066de210&dpr=2&auto=format&fit=crop&w=225&q=60"
  }
];

const express = require("express");

app = express();
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
    res.render("./landing");
  }
);

app.get(
  "/campgrounds",

  (req, res) => {
    res.render("campgrounds", { campgrounds });
  }
);

app.post(
  "/campgrounds",

  (req, res) => {
    //the value of the name attribute of the first input tag
    const name = req.body.name;
    //the value of the name attribute of the second input tag
    const image = req.body.image;
    //push the new object into the campgrounds array
    campgrounds.push({ name: name, image: image });
    //redirect to the get request of /campgrounds  when the form is submitted
    res.redirect("/campgrounds");
  }
);

app.get(
  "/campgrounds/new",

  (request, response) => {
    response.render("new");
  }
);
