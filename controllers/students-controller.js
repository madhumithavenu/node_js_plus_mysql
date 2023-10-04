const mysql = require("mysql");
const express = require("express");
const connection = require('../model/connection.js')

module.exports.homePage = (req, res) => {
    res.sendFile(__dirname + '/register.html');
};

module.exports.insertValues = (req, res) => {
    console.log(req.body);
    const { name, email, mobile } = req.body;

    let sql_query = `INSERT INTO STUDENTS (NAME, EMAIL, MOBILE) VALUES('${name}', '${email}', '${mobile}');`;
    connection.query(sql_query, (err, result) => {
        if (err) return console.log("Error while inserted data " + err);
        // res.json({ 'message ': "insert was successfull", "result": result.insertId });

        res.redirect("student");
    });
};

module.exports.getStudent = (req, res) => {
    let sql = "SELECT * FROM STUDENTS";

    connection.query(sql, (err, result) => {
        if (err) return console.log(err);

        res.render("students", { students: result });
        // res.render('students');
    });
};

module.exports.deleteStudent = (req, res) => {
    let sql = "DELETE FROM STUDENTS WHERE ID=?";

    let id = req.query.id;
    connection.query(sql, [id], (err, result) => {
        if (err) return console.log(err);

        res.redirect("student");
    });
};

module.exports.updateStudent = (req, res) => {
    let sql = "SELECT * FROM STUDENTS WHERE ID=?";

    let id = req.query.id;
    connection.query(sql, [id], (err, result) => {
        if (err) return console.log(err);

        res.render("update-student", { student: result });
    });
};

module.exports.updateStudentDetails = (req, res) => {

    let name = req.body.name;
    let email = req.body.email;
    let mobile = req.body.mobile;
    let id = req.body.id;

    let sql = "UPDATE STUDENTS SET NAME=?, EMAIL=?, MOBILE=? WHERE ID=?";

    connection.query(sql, [name, email, mobile, id], (err, result) => {
        if (err) return console.log(err);

        res.redirect('student');
    });
};

module.exports.searchStudents= (req, res)=>{
    let sql = "SELECT * FROM STUDENTS";
    connection.query(sql, (err, result)=>{
        if(err ) return console.log(err);
        res.render("search-students", {students:result});
       
    })
}

module.exports.searchStudentsDetails =(req, res)=>{
    let name = req.query.name;
    let email = req.query.email;
    let mobile = req.query.mobile;
    let sql = "SELECT * FROM STUDENTS WHERE NAME LIKE '%"+name+"%'AND EMAIL LIKE '%"+email+"%' AND MOBILE LIKE '%"+mobile+"%'";
    connection.query(sql, (err, result)=>{
        if(err)console.log(err);
        res.render("search-students", {students:result});
    })
}