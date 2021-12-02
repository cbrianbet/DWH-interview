require('dotenv').config()

module.exports = {
  development: {
    host: process.env.DEV_DATABASE_URL,
    username: process.env.DEV_DB_USER,
    password: process.env.DEV_DB_PASS,
    database: process.env.DEV_DB,
    dialect: 'mysql',
  },
  test: {
    url: process.env.TEST_DATABASE_URL,
    dialect: 'mysql',
  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: 'mysql',
  },
}
