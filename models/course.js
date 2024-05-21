const mongoose = require('mongoose');


const courseSchema = new mongoose.Schema({
    courseTitle: {
        type: String,
        required : true
    },
    courseImage: {
        type: String
    },
    courseAbout: {
        type: String
    },
    curriculumLink: {
        type: String
    },
    cost: {
        type: Number
    },
    joiningLink: {
        type: String
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;