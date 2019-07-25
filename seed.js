const mongoose = require("mongoose");
const Campground = require("./models/campground");
const Comment = require("./models/comment");
const data = [
  {
    name: "cloud's Rest",
    image:
      "https://images.unsplash.com/photo-1563974514898-7aea295e12fa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
  },
  {
    name: "cloud's Rest",
    image:
      "https://images.unsplash.com/photo-1563974514898-7aea295e12fa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
  },
  {
    name: "cloud's Rest",
    image:
      "https://images.unsplash.com/photo-1563974514898-7aea295e12fa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
  },
  {
    name: "cloud's Rest",
    image:
      "https://images.unsplash.com/photo-1563962585448-ec03efbcadb8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
  }
];

function seedDB() {
  //delete all campgrounds
  Campground.deleteMany({}, function(err) {
    if (err) {
      console.log(err);
    }
    console.log("removed camprounds");
    //add a few campgrounds
    data.forEach(function(seed) {
      Campground.create(seed, function(err, campground) {
        //hkkkkkk
        if (err) {
          console.log(err);
        } else {
          console.log("added a campground");
          //create a comment
          Comment.create(
            {
              text: "This place is great,but that's not a problem",
              author: "homer"
            },
            function(err, comment) {
              //bdjjdjvdjkvkdnv
              if (err) {
                console.log(err);
              } else {
                campground.comments.push(comment);
                campground.save();
                console.log("created new comment");
              }
            }
          );
        }
      });
    });
  });
}

module.exports = seedDB;
