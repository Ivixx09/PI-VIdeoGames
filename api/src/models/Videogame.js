const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,

    },
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lanzamiento: {
      type: DataTypes.STRING
    },
    rating: {
      type: DataTypes.INTEGER
    },
    plataforms: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    createdInDatabase:{
      allowNull:false,
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    }
  });
};
