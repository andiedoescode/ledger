const cloudinary = require("../middleware/cloudinary");
const Course = require("../models/Course");
// const Comment = require("../models/Comment")
const User = require("../models/User");

module.exports = {
  getProfile: async (req, res) => {
    try {
      const courses = await Course.find({ user: req.user.id });
      res.render("profile.ejs", { courses: courses, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
}