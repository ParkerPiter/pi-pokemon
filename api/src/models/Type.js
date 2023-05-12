const { DataTypes } = require('sequelize');
module.exports = (sequelize, type)=>{
    return sequelize.define('type',{
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        name:DataTypes.STRING,
    })
}