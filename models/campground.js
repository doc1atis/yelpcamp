const mongoose = require("mongoose");

const campgroundSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  image: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  comments: [
    new mongoose.Schema({
      text: String,
      author: String
    })
  ]
});
module.exports = mongoose.model("campground", campgroundSchema);
