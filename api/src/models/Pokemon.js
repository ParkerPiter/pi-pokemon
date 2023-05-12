// const { DataTypes } = require('sequelize');
// // Exportamos una funcion que define el modelo
// // Luego le injectamos la conexion a sequelize.
// module.exports = (sequelize) => {
//   // defino el modelo
//   sequelize.define('pokemon', {
//     name: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//   });
// };
const { DataTypes } = require('sequelize');
module.exports = (sequelize, type)=>{
  return sequelize.define('pokemon',{
      id:{
          type:DataTypes.INTEGER,
          primaryKey:true,
          autoIncrement:true
      },
      name:DataTypes.STRING,
      image:DataTypes.BLOB,
      vida:DataTypes.INTEGER,
      ataque:DataTypes.INTEGER,
      defensa:DataTypes.INTEGER,
      tipo:DataTypes.STRING(50),
      velocidad:DataTypes.INTEGER,
      peso:DataTypes.INTEGER,
      altura:DataTypes.INTEGER,
  })
}