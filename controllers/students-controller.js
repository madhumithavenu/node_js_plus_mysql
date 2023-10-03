const mysql = require("mysql");
const express = require('express');

const connection = require('../model/connection.js');

module.exports.homePage = (req, res) => {
    res.sendFile(__dirname + '/register.html');
};

module.exports.insertValues = (req, res) => {
    
    console.log(req.body);

    const { name, email, mobile } = req.body;

    let sql_query = `INSERT INTO STUDENTS (NAME, EMAIL, MOBILE) VALUES('${name}', '${email}', '${mobile}');`;

    connection.query(sql_query, (err, result) => {
        if (err) return console.log("Error while inserted data " + err);
        res.json({ 'message ': "insert was successfull", "result": result.insertId });
    });

};