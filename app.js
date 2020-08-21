require('dotenv').config();
var express = require('express');
var pug = require('pug');
var bodyParser = require('body-parser');
var userRouter = require('./routes/index.router');


const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL);

var port = 3000;

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'pug');
app.set("views", "./views");

app.use(express.static('public'))

app.use('/', userRouter);

app.listen(port, () => {
    console.log('app listening at http://localhost:' + port);
});