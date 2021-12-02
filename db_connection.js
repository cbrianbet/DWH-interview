const Sequelize = require("sequelize");
require("dotenv").config();

const database = process.env.DEV_DB;
const username = process.env.DEV_DB_USER;
const password = process.env.DEV_DB_PASS;
const port = process.env.DEV_DB_PORT;
const db_server = process.env.DEV_DATABASE_URL;

const sequelize = new Sequelize (database, username, password, {
    host: db_server,
    dialect: "mysql"
});

const connect = async () => {
    await sequelize
        .authenticate()
        .then(() => {
            console.log("Connection has been established successfully.");
        })
        .catch(err => {
            console.log("Unable to connect to the database:", err.message);
        });
};
const db = {
    sequelize: sequelize,
    connect
};

module.exports = db;
