const Course = require('../models/Course');

exports.createCourse = async (req, res) => {
  try {
    const { title, description } = req.body;
    const course = await Course.create({ title, description, teacher: req.user._id });
    res.json(course);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.listCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate('teacher', 'name email role');
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate('teacher', 'name email role').populate('students', 'name email');
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.json(course);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.enrollInCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });
    if (course.students.includes(req.user._id)) return res.status(400).json({ message: 'Already enrolled' });
    course.students.push(req.user._id);
    await course.save();
    res.json({ message: 'Enrolled', course });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};