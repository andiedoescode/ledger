const cloudinary = require("../middleware/cloudinary");
const Course = require("../models/Course");
const User = require("../models/User");
const moment = require("moment");

module.exports = {

  //GET /dashboard
  getDashboard: async (req, res) => {
    try {
      const courses = await Course.find({ createdById: req.user.id}).sort({ completeDate: "desc" }).lean();
      let totalHrs = 0
      courses.forEach(course => totalHrs += course.ceLength)
      let targetHrs = req.user.targetHrs
      let targetCompletion = Math.floor((totalHrs/targetHrs) * 100)

      res.render("dashboard.ejs", {
        courses: courses,
        totalHrs: totalHrs,
        targetHrs: targetHrs,
        targetCompletion: targetCompletion,
        user: req.user,
        moment: moment
      });
    } catch (err) {
        console.log(err);
    }
  },

  //GET /course/:id
  getCourse: async (req, res) => {
    try {
      const ce = await Course.findById(req.params.id);
      const user = await User.findById(ce.createdById);

      res.render("course.ejs", {
        course: ce, 
        user: req.user, 
        moment: moment
      });

    } catch (err) {
        console.log(err);
    }
  },

  //GET /course/addcourse
  //Get page to add a new course
  newCourse: (req, res) => {
    let today = moment.utc().format('YYYY-MM-DD');
    res.render("addcourse.ejs", {
      today: today, 
      user: req.user
    });
  },

  //POST /course/
  //Submit the new course
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
          courseNote: req.body.courseNote,
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
          image: "",
          cloudinaryId: "",
        });
      }
      console.log("Course has been added!");
      res.redirect("/dashboard");
    } catch (err) {
        console.log(err);
    }
  },

  //GET /course/editCourse/:id
  //Get page to edit specific course
  editCourse: async (req, res) => {
    try {
      const course = await Course.findOne({ _id: req.params.id }).lean()

      if (!course) {
        console.log(err)
      }
      if (course.createdById != req.user.id) {
        res.redirect("/dashboard")
      } else {
        res.render("editcourse.ejs", { 
          course: course, 
          user: req.user 
        })
      }

    } catch (err) {
        console.log(err);
    }
  },

  //PUT /course/:id
  //Update the specific course
  updateCourse: async (req, res) => {
    let course = await Course.findById(req.params.id)

    try {    

      const courseData = {
        title: req.body.title,
        presenter: req.body.presenter,
        ceLength: req.body.ceLength,
        completeDate: req.body.completeDate,
        courseNote: req.body.courseNote,
        createdById: req.user.id,
      }

      if (req.file) {
        if (course.cloudinaryId) {
          await cloudinary.uploader.destroy(course.cloudinaryId)
        }

        const result = await cloudinary.uploader.upload(req.file.path)

        courseData.image = result.secure_url
        courseData.cloudinaryId = result.public_id
      }
      await Course.updateOne (course, courseData)

        console.log("Course has been updated!")
        //Redirect to course's info page
        res.redirect("/course/" + `${req.params.id}`);
      } catch (err) {
        req.flash('error', { msg: "Could not update this course."})
        console.log(err);
    }
  },

  //DELETE /course/:id.cloudinaryId
  deleteCourse: async (req, res) => {
    try {
        //Find course by id
        let course = await Course.findById({ _id: req.params.id})
        //Delete image upload from Cloudinary
        await cloudinary.uploader.destroy(course.cloudinaryId)
        //Delete course from db
        await Course.findByIdAndDelete({ _id: req.params.id}).lean()
      res.redirect("/dashboard")
    } catch (err) {
      req.flash('error', { msg: "Could not delete this course." })
      console.log (err)
    }
  },

  //PUT /course/:id
  //Update course by deleting upload
  deleteUpload: async (req, res) => {
    //Find course by id
    let course = await Course.findById(req.params.id)

    try {
        //Delete image upload from Cloudinary
        await cloudinary.uploader.destroy(course.cloudinaryId)

        let filter = {"_id": `${req.params.id}`}
        let update = {
          'image': "",
          'cloudinaryId': ""
        }

        //Wait for document to update and return updated document
        await Course.findOneAndUpdate(filter, update,
          {new: true}
        )

      //Redirect back to the course's info page
      res.redirect("/course/" + `${req.params.id}`)
    } catch (err) {
      req.flash('error', { msg: "Could not delete this course." })
      console.log (err)
    }
  }

};