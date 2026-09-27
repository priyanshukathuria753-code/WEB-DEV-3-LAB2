
const express = require("express");

const logger = require("./middleware/logger");

const studentRoutes = require("./routes/studentRoutes.js");


const app = express();

const PORT = 3000;


// ========================================
// MIDDLEWARE
// ========================================

// Allows Express to read JSON request bodies
app.use(express.json());

// Custom logger middleware
app.use(logger);


// ========================================
// HOME ROUTE
// ========================================

app.get("/", (req, res) => {

    res.status(200).json({
        success: true,
        message: "Student Management REST API is running"
    });

});


// ========================================
// STUDENT ROUTES
// ========================================

app.use("/students", studentRoutes);


// ========================================
// 404 ERROR HANDLER
// ========================================

app.use((req, res) => {

    res.status(404).json({
        success: false,
        message: "Route not found"
    });

});


// ========================================
// GLOBAL ERROR HANDLER
// ========================================

app.use((err, req, res, next) => {

    console.error(err.stack);

    res.status(500).json({
        success: false,
        message: "Internal Server Error"
    });

});


// ========================================
// START SERVER
// ========================================

app.listen(PORT, () => {

    console.log(
        `Server running at http://localhost:${PORT}`
    );

});

