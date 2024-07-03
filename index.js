const express = require('express');
const hbs = require('hbs')
const app = express();
const path = require('path')
const bodyParser = require('body-parser')

const routes = require("./routes/index.js");

app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'hbs');
app.set("views", path.join(__dirname, 'views'))
hbs.registerPartials(path.join(__dirname, 'views', 'partials'))


app.use(express.static(path.join()));

app.use('/', routes);

app.listen(3000)
console.log('Listening on port 3000');