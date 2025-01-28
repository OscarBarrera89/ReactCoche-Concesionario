const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('concesionario', {
    id_concesionario: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    direccion: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    fecha_fundacion: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    activo: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 1
    }
  }, {
    sequelize,
    tableName: 'concesionario',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_concesionario" },
        ]
      },
    ]
  });
};
