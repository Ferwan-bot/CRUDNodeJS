const express = require('express')
const router = express.Router();
const connection = require("../utils/connection");

router.get('/', async function (req, res) {
    await connection.query('SELECT sg.Id, sg.Section, g.Id as Grade_Id, g.Name AS GradeName, CONCAT(s.Name, " ", s.Surname) AS StudentName, s.Id as Student_Id, CONCAT(p.Name, " ", p.Surname) AS ProfessorName FROM grade g INNER JOIN professor p ON g.Professor_Id = p.Id INNER JOIN student_grade sg ON sg.Grade_Id = g.Id INNER JOIN student s ON sg.Student_Id = s.Id ORDER BY sg.Id',
        async function (error, results, fields) {
            if (error) throw error;
            var all = results
            await connection.query('SELECT Id as Student_Id, CONCAT(s.Name, " ", s.Surname) AS StudentName FROM student s',
                async function (error, results, fields) {
                    if (error) throw error;
                    var students = results
                    await connection.query('SELECT g.Id, g.Name, CONCAT(p.Name, " ", p.Surname) AS ProfessorName, p.Id as Professor_Id FROM grade g INNER JOIN professor p ON g.Professor_Id = p.Id',
                        async function (error, results, fields) {
                            if (error) throw error;
                            res.render('assign', { layout: './layouts/main', all, students, grades:results })
                        });
                });
        });
});

router.post('/new', async function (req, res) {
    var { Section, Student_Id, Grade_Id } = req.body
    // EDIT
    if (req.body.Id) {
        await connection.query(`UPDATE student_grade SET Student_Id='${Student_Id}', Grade_Id='${Grade_Id}', Section=${Section} WHERE Id = ${req.body.Id}`,
            function (error, results, fields) {
                if (error) throw error;
            });
    }
    // CREATE 
    else {
        await connection.query(`INSERT INTO student_grade (Id, Student_Id, Grade_Id, Section) VALUES (null, '${Student_Id}', '${Grade_Id}', '${Section}')`,
            function (error, results, fields) {
                if (error) throw error;
            });
    }

    res.redirect('/assign')
});

router.get('/delete/:Id', async function (req, res) {

    await connection.query(`DELETE FROM student_grade WHERE Id = ${req.params.Id}`,
        function (error, results, fields) {
            if (error) throw error;
        });
    res.redirect('/assign')
});

module.exports = router