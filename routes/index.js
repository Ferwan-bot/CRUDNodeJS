const express = require('express')
const router = express.Router();
const connection = require("../utils/connection");

const StudentRoutes = require('../routes/student.routes')
const ProfessorRoutes = require('../routes/professor.routes')
const GradeRoutes = require('../routes/grade.routes')
const AssignRoutes = require('../routes/assign.routes')

router.get('/', function (req, res) {
    res.render('home', { layout: './layouts/main'})
});

router.use('/students', StudentRoutes)
router.use('/professors', ProfessorRoutes)
router.use('/grades', GradeRoutes)
router.use('/assign', AssignRoutes)

module.exports = router;