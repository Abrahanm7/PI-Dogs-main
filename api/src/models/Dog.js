const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    heightMin: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    heightMax: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    weightMin : {
        type: DataTypes.STRING,
        allowNull: false
    },
    weightMax : {
      type: DataTypes.STRING,
      allowNull: false
    },
    life_span  : {
        type: DataTypes.STRING,
        allowNull: true
    },
    createdInDb:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    }
  },{timestamps: false});
};
