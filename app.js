require('dotenv').config();
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app = express();

//TODO: require các Models
var Data = require('./models/data.model');
var Station = require('./models/station.model');

var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.use(express.static('public'));
var port = process.env.PORT || 3000;
mongoose.connect(process.env.MONGO_URL);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'pug');
app.set("views", "./views");

//TODO: SETUP các Route
app.use('/', require('./routes/index.router'));

//* Route API
app.use('/api/data',    require('./api/routes/data.routes'));
app.use('/api/user',    require('./api/routes/user.routes'));
app.use('/api/station', require('./api/routes/station.routes'));

app.get('/', function(req, res) {
    res.sendfile(__dirname + '/public/index.html');
});

app.get('/login', function(req, res) {
    res.sendfile(__dirname + '/public/login.html');
});

//*Tạo socket 
io.on("connection", socket => {
    console.log("- user connected");
    socket.on("- disconnect", function() {
        console.log("user disconnected");
    });
    socket.on("Client_gui", function(data) {
        console.log("message: " + data);
    });
});


app.get("/api/data/:muc_nuoc", function(req, res) {
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
        ma_tram: '0001',
        muc_nuoc: req.params.muc_nuoc,
        ngay_thang: a,
        thoi_gian: b
    });

    var data = Data.create(da);
    res.json(data);
    console.log("Server: co data gui len");
    console.log(da);

    io.emit('Client_gui', da);
})


server.listen(port, function() {
    console.log("Connected at port:" + port);
});