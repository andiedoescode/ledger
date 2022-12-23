const cloudinary = require("../middleware/cloudinary");
const Course = require("../models/Course");
const User = require("../models/User");

module.exports = {
  //GET /profile/:id
  getProfile: async (req, res) => {
    try {
      const courses = await Course.find({ createdById: req.user.id });
    
      //Get total number of courses completed
      const totalCourses = courses.length

      //Get total number of hours completed
      let totalHrs = 0
      courses.forEach(course => totalHrs += course.ceLength)


      res.render("profile.ejs", { 
        courses: courses, 
        totalCourses: totalCourses, 
        totalHrs: totalHrs,
        user: req.user, 
      });

    } catch (err) {
      // console.log(err);
      if (err) return res.status(500).send(err.toString());
    }
  },

  //GET /editprofile/:id
  editProfile: async (req, res) => {
    try {
      const profile = await User.findOne({ _id: req.user.id }).lean()

      if (profile._id == req.user.id) {
        res.render("editprofile.ejs", { 
          user: req.user 
        });
        
      } else {
        res.redirect("/dashboard")
      }

    } catch (err) {
        console.log(err);
    }
  },

  //PUT /editProfile/:id
  //Update user's profile
  updateProfile: async (req, res) => {
    let profile = await User.findById({ _id: req.user.id });
    // console.log (profile)
    // console.log(req.body.userName)
    // console.log(req.body.profId)

    try {
      const profileData = {
        userName: req.body.userName,
        profId: req.body.profId,
        user: req.user.id
      }

      if (req.file) {
        if(profile.cloudinaryId) {
          await cloudinary.uploader.destroy(profile.cloudinaryId);
        }
        
        const result = await cloudinary.uploader.upload(req.file.path)

        profileData.image = result.secure_url
        profileData.cloudinaryId = result.public_id
      }

      await User.updateOne(profile, profileData)

        console.log("Profile has been updated!")
        res.redirect("/profile");
      } catch (err) {
        req.flash('error', { msg: "Could not update this profile"})
        console.log(err);
    }
  },
}