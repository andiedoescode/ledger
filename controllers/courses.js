const cloudinary = require("../middleware/cloudinary");
const Course = require("../models/Course");
const User = require("../models/User")

module.exports = {

  //GET /dashboard
  getDashboard: async (req, res) => {
    try {
      const courses = await Course.find({ createdById: req.user.id}).sort({ completeDate: "desc" }).lean();
      const user = req.user

      res.render("dashboard.ejs", { courses: courses, user: req.user});
    } catch (err) {
        console.log(err);
    }
  },

  //GET /course/:id
  getCourse: async (req, res) => {
    try {
      const ce = await Course.findById(req.params.id);
      const user = await User.findById(ce.createdById);

      res.render("course.ejs", { course: ce, user: req.user });
    } catch (err) {
        console.log(err);
    }
  },

  //GET /course/addcourse
  newCourse: (req, res) => {
    res.render("addcourse.ejs");
  },

  //POST /course/
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

  //GET /course/editCourse/:id
  editCourse: async (req, res) => {
    try {
      const course = await Course.findOne({ _id: req.params.id }).lean()

      if (!course) {
        console.log(err)
      }
      if (course.createdById != req.user.id) {
        res.redirect("/dashboard")
      } else {
        res.render("editCourse.ejs", { course: course, user: req.user })
      }

    } catch (err) {
        console.log(err);
    }
  },

  //PUT /course/:id
  updateCourse: async (req, res) => {
    try {
      let session = req.session
      
      let course = await Course.findById(req.params.id).lean()
        console.log(course.completeDate)
  
        if (!course) {
          return res.render("/dashboard")
        }
  
        if (course.createdById != req.user.id) {
          res.redirect("/dashboard")
        } else {
          course = await Course.findOneAndUpdate({ _id: req.params.id}, req.body, {
            new: true,
            runValidators: true,
          })
        }
        res.redirect("/dashboard");
      } catch (err) {
        req.flash('error', { msg: "Could not update this course. "})
        console.log(err);
    }
  },

  //DELETE /course/:id
  deleteCourse: async (req, res) => {
    try {
         await Course.findByIdAndDelete({ _id: req.params.id}).lean()
      res.redirect("/dashboard")
    } catch (err) {
      req.flash('error', { msg: "Could not delete this course." })
      console.log (err)
    }
  },
};
