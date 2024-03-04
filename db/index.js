const Sequelize = require("sequelize");
const { db_config, getSequelizeConfig } = require("../config/db");
const { getModels } = require("../schema");
const sequelize = new Sequelize(
  db_config.db_connection_url,
  getSequelizeConfig()
);
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.models = getModels(db);
console.log(db.models);
module.exports = db;
