const express = require("express");
const app = express();
const logger = require('morgan');
const bodyParser = require("body-parser");
require("dotenv").config();
const db = require("./db_connection");

const users = require("./routes/users");
// const data = require("./routes/data");

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(logger('dev'))
app.use("/api/auth", users);
// app.use("/api/data", data);

app.use((err, req, res, next) => {
    const status = err.status || 500;
    res.status(status).json({error: {message: err.message}});
});

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server listening on port: ${process.env.PORT}`);
});
