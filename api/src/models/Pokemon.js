const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
      type:DataTypes.STRING
    },
    imagen:{
      type:DataTypes.STRING
    },
    vida:{
      type:DataTypes.INTEGER
    },
    ataque:{
      type:DataTypes.INTEGER
    },
    defensa:{
      type:DataTypes.INTEGER
    },
    velocidad:{
      type:DataTypes.INTEGER
    },
    peso:{
      type:DataTypes.INTEGER
    },
    altura:{
      type:DataTypes.INTEGER
    },
    specialAtak:{
      type:DataTypes.INTEGER,
      defaultValue: 1
    },
    specialDefense:{
      type:DataTypes.INTEGER,
      defaultValue: 1
    }
  });
};
