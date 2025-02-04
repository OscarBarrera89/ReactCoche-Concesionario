const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('coche', {
    id_coche: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_concesionario: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'concesionario',
        key: 'id_concesionario'
      }
    },
    matricula: {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    modelo: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    precio: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    },
    disponible: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 1
    },
    fecha_registro: {
      type: DataTypes.DATEONLY,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'coche',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_coche" },
        ]
      },
      {
        name: "id_concesionario",
        using: "BTREE",
        fields: [
          { name: "id_concesionario" },
        ]
      },
    ]
  });
};
