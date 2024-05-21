const Course = require('../models/course');
const Review =require('../models/review');

module.exports.upload = async function(req, res) {
    try {
        const courseData = req.body;
        // console.log(courseData);
        const creatorId = req.body.userId;
        // console.log(creatorId);

        const file = req.file.filename;
        // console.log(file);

        courseData.courseImage = file;

        courseData.creator = creatorId;
        const newCourse = new Course(courseData);

        const savedCourse = await newCourse.save();

        // console.log("Course saved successfully:", savedCourse);
        // return res.status(201).json({ message: "Course uploaded successfully", course: savedCourse });
    } catch (error) {
        console.error("Error saving course:", error);
        // return res.status(500).json({ error: "Internal server error" });
    }
};


module.exports.getData = function(req, res) {
    Course.find()
      .populate('userId')
      .then(courses => {
        // console.log("These are the courses:", courses);
        return res.json(courses);
      })
      .catch(error => {
        // console.error("Error fetching courses:", error);
        return res.json(error);
      });
};

module.exports.singleCourse = async function(req,res){
  try {
    const courseId = req.params.courseId;
    const course = await Course.findById(courseId).populate('userId');

    if (!course) {
        return res.status(404).json({ error: 'Course not found' });
    }

    res.json(course);
} catch (error) {
    console.error('Error fetching course:', error);
    res.status(500).json({ error: 'Server error' });
}
}

module.exports.postReview = async function(req,res){
  try {
    const { courseId, userId, reviewText, rating } = req.body;

    const newReview = new Review({
        courseId,
        userId,
        reviewText,
        rating
    });

    const savedReview = await newReview.save();
    res.status(201).json(savedReview);
} catch (error) {
    console.error('Error posting review:', error);
    res.status(500).json({ error: 'Internal server error' });
}
}


module.exports.fetchReview = async function(req,res){
  console.log(req.body , 'fetch review body');

  try {
    const courseId = req.body.courseId;
    const reviews = await Review.find({ courseId }).populate('userId', 'username');

    if (!reviews) {
        return res.status(404).json({ error: 'No reviews found for this course' });
    }

    res.json(reviews);
} catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ error: 'Internal server error' });
}
}

  