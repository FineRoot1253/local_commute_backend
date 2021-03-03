const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const config = require("../config/config");
const db = {};

console.log(config);

const sequelize = new Sequelize({
  host: config.host,
  username: config.username,
  password: config.password,
  port: config.port,
  database: config.database,
  dialect: "mysql",
});

fs.readdirSync('./model')
.forEach((file) => {
                //const model = sequelize.import(path.join('./models', file));
                const model = require(path.join(__dirname,'model', file))(sequelize, Sequelize)
                sequelize[model.name] = model;
            });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;