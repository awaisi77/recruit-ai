

const db = require("../db");
class Datasources {
  static getDatabase() {
    return db;
  }

}

module.exports = Datasources;
