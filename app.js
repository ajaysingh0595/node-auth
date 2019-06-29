const express = require('express');
const logger = require('morgan');
const routesAuth = require('./routes/auth');
const auth = require('./middleware/auth');
const routesUsers = require('./routes/users');
const bodyParser = require('body-parser');
const mongoose = require('./config/database'); //database configuration
var jwt = require('jsonwebtoken');
const app = express();
app.set('secretKey', 'nodeRestApi'); // jwt secret token
// connection to mongodb
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.get('/', function (req, res) {
    res.json({ "api": "API Working " });
});
// public route
app.use('/users', routesUsers);
app.use('/auth', routesAuth);
// private route
// add auth middalware

app.get('/favicon.ico', function (req, res) {
    res.sendStatus(204);
});

// express doesn't consider not found 404 as an error so we need to handle 404 explicitly
// handle 404 error
app.use(function (req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});
// handle errors
app.use(function (err, req, res, next) {
    if (err.status === 404)
        res.status(404).json({ message: "Route Not found" });
    else
        res.status(500).json({ message: "Something looks wrong :( !!!" });
});
app.listen(3000, function () {
    console.log('Node server listening on port 3000');
});