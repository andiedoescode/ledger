const cloudinary = require("../middleware/cloudinary");
const Course = require("../models/Course");
// const Comment = require("../models/Comment")
const User = require("../models/User")

module.exports = {
  getDashboard: async (req, res) => {
    try {
      const courses = await Course.find().sort({ createdAt: "desc" }).lean();
      res.render("dashboard.ejs", { courses: courses });
    } catch (err) {
      console.log(err);
    }
  },
  getCourse: async (req, res) => {
    try {
      const ce = await Course.findById(req.params.id);
    //   const comments = await Comment.find({ postId: req.params.id}).sort({ createdAt: "asc" }).lean();
      const user = await User.findById(ce.createdById);
      res.render("course.ejs", { course: ce, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  newCourse: (req, res) => {
    res.render("addcourse.ejs");
  },
  addCourse: async (req, res) => {
    try {

      if (req.file !== undefined) {
        // Upload image to cloudinary
        const result = await cloudinary.uploader.upload(req.file.path);

        await Course.create({
          title: req.body.title,
          presenter: req.body.presenter,
          ceLength: req.body.ceLength,
          completeDate: req.body.completeDate,
          createdById: req.user.id,
          image: result.secure_url,
          cloudinaryId: result.public_id,
        });
      } else {
        await Course.create({
          title: req.body.title,
          presenter: req.body.presenter,
          ceLength: req.body.ceLength,
          completeDate: req.body.completeDate,
          createdById: req.user.id,
          image: null,
          cloudinaryId: null,
        });
      }
      console.log("Course has been added!");
      res.redirect("/dashboard");
    } catch (err) {
      console.log(err);
    }
  },
};
