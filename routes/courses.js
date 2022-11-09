const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const coursesController = require("../controllers/courses");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes - simplified for now
router.get("/:id", ensureAuth, coursesController.getCourse);

router.post("/addCourse", upload.single("file"), coursesController.addCourse);

// router.delete("/deleteCourse/:id", coursesController.deleteCourse);

module.exports = router;
