const express = require('express')
const router = express.Router();
const connection = require("../utils/connection");

router.get('/', async function (req, res) {
    await connection.query('SELECT Id, Name, Surname, Gender FROM professor ORDER BY Id',
        async function (error, results, fields) {
            if (error) throw error;
            res.render('professors_all', { layout: './layouts/main', professors: results })
        });
});

router.post('/new', async function (req, res) {
    var { Name, Surname, Gender, DoB } = req.body
    // EDIT
    if (req.body.Id) {
        await connection.query(`UPDATE professor SET Name='${Name}', Surname='${Surname}', Gender=${Gender} WHERE Id = ${req.body.Id}`,
            function (error, results, fields) {
                if (error) throw error;
            });
    }
    // CREATE 
    else {
        await connection.query(`INSERT INTO professor (Id, Name, Surname, Gender) VALUES (null, '${Name}', '${Surname}', ${Gender})`,
            function (error, results, fields) {
                if (error) throw error;
            });
    }

    res.redirect('/professors')
});

router.get('/delete/:Id', async function (req, res) {

    await connection.query(`DELETE FROM professor WHERE Id = ${req.params.Id}`,
        function (error, results, fields) {
            if (error) throw error;
        });
    res.redirect('/professors')
});

module.exports = router