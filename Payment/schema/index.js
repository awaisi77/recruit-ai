const { gql } = require("apollo-server");
const logger = require("../utils/logger");
const fs = require("fs");
const path = require("path");
const queryTypeDep = gql`
  type Query
`;
let typeDefs = [queryTypeDep];
let resolvers = {};
let models_array = [];
let models = {};

const setUpSchema = () => {
  let maniDir = __dirname;
  const CheckFile = (filePath) => fs.statSync(filePath).isFile();
  let dir = fs.readdirSync(maniDir).filter((file) => {
    if (
      path.basename(file) != "__mocks__" &&
      path.basename != "__test__" &&
      file != "index.js"
    ) {
      return true;
    }
  });
  dir.forEach((folder) => {
    const filename = folder + "/" + "index.js";
    const filepath = path.join(maniDir, filename);
    if (fs.existsSync(filepath) && CheckFile(filepath)) {
      try {
        const {
          resolvers: importedresolver,
          typeDef,
          model,
        } = require(filepath);
        if (typeDef) {
          typeDefs.push(typeDef);
        }
        if (importedresolver) {
          resolvers = { ...importedresolver };
        }
        if (model) {
          models_array.push(model);
        }
      } catch (e) {
        logger.warn("Unable to load Schema files");
        logger.warn(e.stack);
      }
    }
  });
};
setUpSchema();
const getModels = (db) => {
  models_array.forEach((model) => {
    const Model = model(db.sequelize, db.Sequelize.DataTypes);
    models[Model.name] = Model;
  });
  return models;
};
module.exports = { typeDefs, resolvers, getModels };
