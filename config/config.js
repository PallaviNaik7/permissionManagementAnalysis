require("dotenv").config();

module.exports = {
  production: {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    host: process.env.HOST,
    logging: false,
    dialect: "postgres",
    pool: {
      max: 1,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
};
