const express = require("express");
const app = express();
const logger = require('morgan');
const bodyParser = require("body-parser");
require("dotenv").config();
const db = require("./db_connection");
const cors = require("cors");

const users = require("./routes/users");
const http = require("http");
const data = require("./routes/data");

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(logger('dev'));
app.use(cors());
app.options('*', cors())
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use("/api/auth", users);
app.use("/api/data", data);

app.use((err, req, res, next) => {
    const status = err.status || 500;
    res.status(status).json({error: {message: err.message}});
});

// test
app.use('/test', (req, res) => {
    return res.status(200).send("all good")
});


app.listen(process.env.PORT || 5000, () => {
    console.log(`Server listening on port: ${process.env.PORT}`);
});

// catch 404 and forward to error handler
app.use('*', (req, res) => {
    return res.status(404).json({
        success: false,
        message: 'API endpoint doesnt exist'
    })
});

const server = http.createServer(app);
module.exports = server
