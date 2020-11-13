require('dotenv').config();
var express = require('express');
var bodyParser = require('body-parser');
var userRouter = require('./routes/index.router');
var apiData = require('./api/routes/data.routes');
var apiUser = require('./api/routes/user.routes');
var Data = require('./models/data.model');
var Setup = require('./models/setup.model');
var mongoose = require('mongoose');

var app = express();

var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.use(express.static('public'));

var port = process.env.PORT || 3000;

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

app.get('/', function(req, res) {
    res.sendfile(__dirname + '/public/index.html');
});

app.get('/login', function(req, res) {
    res.sendfile(__dirname + '/public/login.html');
});

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

// app.post("/api/data", function(req, res) {
//     var data = Data.create(req.body);
//     res.json(data);
//     console.log("Server: co data gui len");
//     console.log(req.body);

//     io.emit('Client_gui', req.body);
// });

// var nDate = new Date().toLocaleString('en-GB', {
//     timeZone: 'Asia/Ho_Chi_Minh'
// });
// console.log(nDate);


app.post("/api/data", function(req, res) {
    var date_ob = new Date();

    var date = ("0" + date_ob.getDate()).slice(-2);
    var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    var year = date_ob.getFullYear();

    var hours = parseInt(date_ob.getHours()) + 7;

    if (hours >= 24) {
        date = ("0" + (parseInt(date_ob.getDate() + 1))).slice(-2);
        hours = parseInt(hours) - 24;
    }

    var minutes = date_ob.getMinutes();
    var seconds = date_ob.getSeconds();

    var a = year + "-" + month + "-" + date;
    var b = hours + ":" + minutes + ":" + seconds;

    console.log("date: " + a);
    console.log("time: " + b);

    var da = new Data({
        waterLevel: req.param('waterLevel'),
        date: a,
        time: b
    });

    var data = Data.create(da);
    res.json(data);
    console.log("Server: co data gui len");
    console.log(da);

    io.emit('Client_gui', da);
})



// test setup
app.post("/api/setup", function(req, res) {
    // var setup = Setup.create(req.body);
    Setup.updateOne({ _id: "5f423e658f7c44f22f62b30f" }, {
            stationNumber: req.body.stationNumber,
            waterLevelLimit: req.body.waterLevelLimit
        },
        function(err, result) {
            if (err) {
                console.log(err);
            } else {
                console.log(result);
            }
        });
    // res.json(setup);
    res.sendStatus(200);
    console.log("Server: co setup gui len");
    console.log(req.body);

    // io.emit('Client_gui_setup', req.body);
});
//end test setup

server.listen(port, function() {
    console.log("- Connected at port:" + port);
});