var DataTypes = require("sequelize").DataTypes;
var _coche = require("./coche");
var _concesionario = require("./concesionario");

function initModels(sequelize) {
  var coche = _coche(sequelize, DataTypes);
  var concesionario = _concesionario(sequelize, DataTypes);

  coche.belongsTo(concesionario, { as: "id_concesionario_concesionario", foreignKey: "id_concesionario"});
  concesionario.hasMany(coche, { as: "coches", foreignKey: "id_concesionario"});

  return {
    coche,
    concesionario,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
