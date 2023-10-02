const mysql = require('mysql');
const express = require('express');


let app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root123",
    database: "college"

});

connection.connect(err => {
    if (err) console.log("There is an error while connecting" + err);

    app.listen(4000);

    console.log("DB Connected" + connection.threadId);
    console.log("Server started at port 4000");

})


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/register.html');
});

app.post('/submit', (req, res) => {
    console.log(req.body);

    const { name, email, mobile } = req.body;

    let sql_query = `INSERT INTO STUDENTS (NAME, EMAIL, MOBILE) VALUES('${name}', '${email}', '${mobile}');`;
    connection.query(sql_query, (err, result) => {
        if (err) return console.log("Error while inserted data " + err);
        res.json({ 'message ': "insert was successfull", "result": result.insertId });
    });

});