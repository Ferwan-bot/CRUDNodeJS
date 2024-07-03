const express = require('express')
const router = express.Router();
const connection = require("../utils/connection");

router.get('/', async function (req, res) {
    await connection.query('SELECT Id, Name, Surname, Gender, DATE_FORMAT(DoB, "%Y-%m-%d") as DoB FROM student ORDER BY Id',
        async function (error, results, fields) {
            if (error) throw error;
            res.render('students_all', { layout: './layouts/main', students: results })
        });
});

router.post('/new', async function (req, res) {
    var { Name, Surname, Gender, DoB } = req.body
    // EDIT
    if (req.body.Id) {
        await connection.query(`UPDATE student SET Name='${Name}', Surname='${Surname}', Gender=${Gender}, DoB='${DoB}' WHERE Id = ${req.body.Id}`,
            function (error, results, fields) {
                if (error) throw error;
            });
    }
    // CREATE 
    else {
        await connection.query(`INSERT INTO student (Id, Name, Surname, Gender, DoB) VALUES (null, '${Name}', '${Surname}', ${Gender}, '${DoB}')`,
            function (error, results, fields) {
                if (error) throw error;
            });
    }

    res.redirect('/students')
});

router.get('/delete/:Id', async function (req, res) {

    await connection.query(`DELETE FROM student WHERE Id = ${req.params.Id}`,
        function (error, results, fields) {
            if (error) throw error;
        });
    res.redirect('/students')
});

module.exports = router