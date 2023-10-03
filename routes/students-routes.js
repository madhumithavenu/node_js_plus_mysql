const express = require("express");

const { homePage, insertValues } = require("../controllers/students-controller.js");

const studentRouter = express.Router();
studentRouter.get("/", homePage);
studentRouter.post('/submit', insertValues);

module.exports = studentRouter;