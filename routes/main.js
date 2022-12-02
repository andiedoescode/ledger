const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const authController = require("../controllers/auth");
const homeController = require("../controllers/home");
const coursesController = require("../controllers/courses")
const profileController = require("../controllers/profile")
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Main Routes - simplified for now
router.get("/", homeController.getIndex);

router.get("/profile", ensureAuth, profileController.getProfile);
router.get("/editprofile", ensureAuth, profileController.editProfile);
router.put("/:id", ensureAuth, upload.single("file"), profileController.updateProfile)

router.get("/dashboard", ensureAuth, coursesController.getDashboard);

router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);

router.get("/logout", authController.logout);

router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);

router.get("/addcourse", ensureAuth, coursesController.newCourse);

module.exports = router;
