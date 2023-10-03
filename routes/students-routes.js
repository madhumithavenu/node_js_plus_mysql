const express = require("express");

const { homePage, insertValues, getStudent, deleteStudent, updateStudent } = require("../controllers/students-controller.js");

const studentRouter = express.Router();
studentRouter.get("/", homePage);
studentRouter.post('/submit', insertValues);
studentRouter.get('/student', getStudent);
studentRouter.get('/delete-student', deleteStudent);
studentRouter.get('/update-student', updateStudent);

module.exports = studentRouter;