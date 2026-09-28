const express = require("express");
const router = express.Router();
const students = require("../data/students");

// Helper: find student index by id
function findIndexById(id) {
  return students.findIndex((s) => s.id === id);
}

// GET /students -> get all students
router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    count: students.length,
    data: students,
  });
});

// GET /students/:id -> get single student by id
router.get("/:id", (req, res) => {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid student id. ID must be a number.",
    });
  }

  const student = students.find((s) => s.id === id);

  if (!student) {
    return res.status(404).json({
      success: false,
      message: `Student with id ${id} not found.`,
    });
  }

  res.status(200).json({ success: true, data: student });
});

// POST /students -> create a new student
router.post("/", (req, res) => {
  const { name, course, age } = req.body;

  if (!name || !course) {
    return res.status(400).json({
      success: false,
      message: "Name and course are required fields.",
    });
  }

  const newStudent = {
    id: students.length > 0 ? students[students.length - 1].id + 1 : 1,
    name,
    course,
    age: age || null,
  };

  students.push(newStudent);

  res.status(201).json({
    success: true,
    message: "Student created successfully.",
    data: newStudent,
  });
});

// PUT /students/:id -> update an existing student
router.put("/:id", (req, res) => {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid student id. ID must be a number.",
    });
  }

  const index = findIndexById(id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: `Student with id ${id} not found.`,
    });
  }

  const { name, course, age } = req.body;

  if (!name && !course && age === undefined) {
    return res.status(400).json({
      success: false,
      message: "Provide at least one field (name, course, age) to update.",
    });
  }

  students[index] = {
    ...students[index],
    name: name !== undefined ? name : students[index].name,
    course: course !== undefined ? course : students[index].course,
    age: age !== undefined ? age : students[index].age,
  };

  res.status(200).json({
    success: true,
    message: "Student updated successfully.",
    data: students[index],
  });
});

// DELETE /students/:id -> delete a student
router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid student id. ID must be a number.",
    });
  }

  const index = findIndexById(id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: `Student with id ${id} not found.`,
    });
  }

  const deletedStudent = students.splice(index, 1)[0];

  res.status(200).json({
    success: true,
    message: "Student deleted successfully.",
    data: deletedStudent,
  });
});

module.exports = router;
