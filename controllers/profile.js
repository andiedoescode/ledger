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
  editProfile: async (req, res) => {
    try {
      const profile = await User.findOne({ _id: req.user.id }).lean()
      console.log(profile._id)
      console.log(req.user.id)

      if (profile._id == req.user.id) {
        res.render("editprofile.ejs", { user: req.user })
      } else {
        res.redirect("/dashboard")
      }

    } catch (err) {
        console.log(err);
    }
  }
}