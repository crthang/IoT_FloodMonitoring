require('dotenv').config();
var express = require('express');
var bodyParser = require('body-parser');
var userRouter = require('./routes/index.router');
var apiData = require('./api/routes/data.routes');
var apiUser = require('./api/routes/user.routes');
var Data = require('./models/data.model');
var mongoose = require('mongoose');

var app = express();

var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.use(express.static('public'));

// var port = 3000;

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

mongoose.connect(process.env.MONGO_URL);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'pug');
app.set("views", "./views");

app.use('/', userRouter);

app.use('/api/data', apiData);

app.use('/api/user', apiUser);


//Tạo socket 
io.on("connection", socket => {
    console.log("user connected");
    socket.on("disconnect", function() {
        console.log("user disconnected");
    });


    socket.on("Client_gui", function(data) {
        console.log("message: " + data);
    });
});

app.post("/api/data", function(req, res) {
    var data = Data.create(req.body);
    res.json(data);
    console.log("Server: co data gui len");
    console.log(req.body);

    io.emit('Client_gui', req.body);
});


server.listen(3000, function() {
    console.log("- Waiting connection at port: 3000");
});