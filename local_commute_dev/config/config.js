const dotenv = require("dotenv");

if (!process.env.DB_HOST_IP) {
  console.log(process.env.DB_HOST_IP);
  dotenv.config();
}

module.exports = {
  host: process.env.DB_HOST_IP,
  username: process.env.DB_HOST_NAME,
  password: process.env.DB_PWD,
  port: process.env.DB_PORT,
  database: process.env.DB_SCHEMA_NAME,
  dialect: "mysql",
  refreshToken: {//60 * 60 * 30
    expiresIn: 60 * 60 * 30,
    calculateExpirationDate: () => new Date(Date.now() + (30 * 60 * 60 * 24 * 1000))
  },
  accessToken: { //60 * 30
    expiresIn: 60 * 30,
    calculateExpirationDate: () => new Date(Date.now() + (60 * 30 * 1000))
  }
};