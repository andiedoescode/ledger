const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    presenter: {
        type: String,
        required: true,
    },
    ceLength: {
        type: Number,
        required: true, 
    },
    completeDate: {
        type: Date,
        default: undefined,
    },
    courseNote: {
        type: String,
    },
    inProgress: {
        type: Boolean,
        default: false,
    },
    createdById: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    image: {
        type: String,
        require: true,
    },
    cloudinaryId: { 
        type: String,
        require: true,
    },
});

module.exports = mongoose.model("Course", CourseSchema);
