const express = require("express");
const logger = require("./middleware/logger");
const studentRoutes = require("./routes/studentRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// Built-in middleware to parse JSON request bodies
app.use(express.json());

// Custom logger middleware (logs method, URL, timestamp)
app.use(logger);

// Root route
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Student Management REST API is running.",
    endpoints: {
      getAllStudents: "GET /students",
      getStudentById: "GET /students/:id",
      createStudent: "POST /students",
      updateStudent: "PUT /students/:id",
      deleteStudent: "DELETE /students/:id",
    },
  });
});

// Modular routing for student APIs
app.use("/students", studentRoutes);

// 404 handler - for any route that doesn't exist
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found.",
  });
});

// Global error handling middleware (catches unexpected errors)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
