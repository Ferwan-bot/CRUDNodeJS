const express = require('express')
const router = express.Router();
const connection = require("../utils/connection");

router.get('/', async function (req, res) {
    await connection.query('SELECT g.Id, g.Name, CONCAT(p.Name, " ", p.Surname) AS ProfessorName, p.Id as Professor_Id FROM grade g INNER JOIN professor p ON g.Professor_Id = p.Id ORDER BY g.Id',
        async function (error, results, fields) {
            if (error) throw error;
            var grades = results
            await connection.query('SELECT Id as Professor_Id, CONCAT(p.Name, " ", p.Surname) AS ProfessorName FROM professor p',
                async function (error, results, fields) {
                    if (error) throw error;
                    res.render('grades_all', { layout: './layouts/main', grades, professors: results })
                });
        });
});

router.post('/new', async function (req, res) {
    var { Name, Professor_Id } = req.body
    // EDIT
    if (req.body.Id) {
        await connection.query(`UPDATE grade SET Name='${Name}', Professor_Id=${Professor_Id} WHERE Id = ${req.body.Id}`,
            function (error, results, fields) {
                if (error) throw error;
            });
    }
    // CREATE 
    else {
        await connection.query(`INSERT INTO grade (Id, Name, Professor_Id) VALUES (null, '${Name}', '${Professor_Id}')`,
            function (error, results, fields) {
                if (error) throw error;
            });
    }

    res.redirect('/grades')
});

router.get('/delete/:Id', async function (req, res) {

    await connection.query(`DELETE FROM grade WHERE Id = ${req.params.Id}`,
        function (error, results, fields) {
            if (error) throw error;
        });
    res.redirect('/grades')
});

module.exports = router