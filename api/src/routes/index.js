const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;


/* const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
const sequelize = new Sequelize('postgres://user:pass@host:port/database');

const Pokemon = sequelize.define('Pokemon', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: DataTypes.STRING,
  imagen: DataTypes.STRING,
  vida: DataTypes.INTEGER,
  ataque: DataTypes.INTEGER,
  defensa: DataTypes.INTEGER,
  velocidad: DataTypes.INTEGER,
  altura: DataTypes.FLOAT,
  peso: DataTypes.FLOAT
});

const Type = sequelize.define('Type', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: DataTypes.STRING
});

app.get('/pokemons', async (req, res) => {
  const pokemons = await Pokemon.findAll();
  res.json(pokemons);
});

app.get('/types', async (req, res) => {
  const types = await Type.findAll();
  res.json(types);
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
}); */