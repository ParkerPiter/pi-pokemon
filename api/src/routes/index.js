const { Router } = require('express');
const { Op } = require('sequelize');
const axios = require('axios');

const { Pokemon, Type } = require('../db')

const router = Router();

//Guardado en la DB
async function getData(){
    try {
        // Comprobar cuántos tipos existen actualmente
        const count = await Type.count();
        if (count >= 20) {
            console.log('Ya existen 20 o más tipos en la base de datos.');
            return;
        }

        // Hacer una solicitud GET a la API de Pokémon
        const response = await axios.get('https://pokeapi.co/api/v2/type');

        // Extraer los tipos de la respuesta
        let types = response.data.results.map(result => {
            return { 
                id: result.id,
                name: result.name 
            };
        });
        types = types.slice(0, 20);

        // Guardar los tipos en la base de datos
        await Type.bulkCreate(types, { ignoreDuplicates: true });

        console.log('Los types FUERON GUARDADOS EXITOSAMENTE');
    }
    catch (error) {
        console.error('Hubo un error al obtener o guardar los tipos:', error);
    }
}
getData();

router.get("/pokemons", async(req,res)=>{
    try {
        //Obtener de la DB
        let dbPokemons = await Pokemon.findAll({include: Type});
        console.log("dbpokemon:", dbPokemons)
        console.log("1ero",dbPokemons[0].dataValues.types)
        console.log("2do",dbPokemons[0].types)
        dbPokemons = dbPokemons.map(pokemon => ({id: pokemon.id, source: 'db', name: pokemon.dataValues.name, height: pokemon.dataValues.altura, weight: pokemon.dataValues.peso, sprites:{other:{home: {front_default:pokemon.dataValues.imagen}}}, stats:[{base_stat: pokemon.dataValues.vida}, {base_stat: pokemon.dataValues.defensa}, {base_stat: pokemon.dataValues.ataque}, {base_stat: 1}, {base_stat: 1 } ,{base_stat: pokemon.dataValues.velocidad}], types: pokemon.dataValues.types ? pokemon.dataValues.types.map(type => ({ type: { name: type.name } })) : []}));
        console.log("dbpokemon despues del mapeo:", dbPokemons[0].types)

        // Obtener datos de la API
        let apiPokemons = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=130');
        // apiPokemons = apiPokemons.data.results.map(pokemon => ({...pokemon, source: 'api'}));
        if (Array.isArray(apiPokemons.data.results)) {
            apiPokemons = apiPokemons.data.results;
            let apiPokemonsDetails = [];
                for (let i = 0; i < apiPokemons.length; i += 50) {
                const detailsPromises = apiPokemons.slice(i, i + 50).map(pokemon => axios.get(pokemon.url));
                const detailsResponses = await Promise.allSettled(detailsPromises);
                apiPokemonsDetails = [...apiPokemonsDetails, ...detailsResponses];
                }

                // Extraer los datos de los detalles de las respuestas
                apiPokemons = apiPokemonsDetails.map(response => ({...response.value.data, source: 'api'}));
        } else {
            console.error('La respuesta de la API no es un array:', apiPokemons.data.results);
        }
    
        // Combinar los datos
        let pokemons = dbPokemons.concat(apiPokemons);
        // console.log("Api pokemons: ",apiPokemons)
        // console.log(dbPokemons)

        // Posicionar los pokemones de la base de datos al principio
        pokemons = pokemons.sort((a, b) => {
            if (a.source === 'db' && b.source !== 'db') return -1;
            if (b.source === 'db' && a.source !== 'db') return 1;
            return 0;
        });
      
      res.json(pokemons);
    }
    catch(error){
        console.error(error);
        res.status(500).send('Internal server error');
    }
  })

  //Busqueda por Name
  router.get('/pokemons/name', async (req, res) => {
    try {
        const name = req.query.name.toLowerCase();
        
        let pokemon = await Pokemon.findAll({
            where: {
                name: {
                    [Op.substring]:`${name}`
                }
            }
        });
        if (pokemon.length > 0) {
            // Aplica el mapeo a los pokemons
            pokemon = pokemon.map(pokemon => ({
                id: pokemon.id,
                source: 'db',
                name: pokemon.dataValues.name,
                height: pokemon.dataValues.altura,
                weight: pokemon.dataValues.peso,
                sprites:{other:{home: {front_default:pokemon.dataValues.imagen}}},
                stats:[
                    {base_stat: pokemon.dataValues.vida},
                    {base_stat: pokemon.dataValues.defensa},
                    {base_stat: pokemon.dataValues.ataque},
                    {base_stat: 1},
                    {base_stat: 1 },
                    {base_stat: pokemon.dataValues.velocidad}
                ],
                types: pokemon.dataValues.types ? pokemon.dataValues.types.map(type => ({ type: { name: type.name } })) : []
            }));
            res.json(pokemon);
        } else {
            // Si no se encuentra el pokemon en la base de datos, buscar en la API
            try {
                const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
                const apiPokemon = response.data;
                res.json({...apiPokemon, source: 'api'});
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    res.status(404).send('Pokémon not found');
                } else {
                    console.error(error);
                    res.status(500).send('Error fetching Pokémon from API');
                }
            }
        }
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
});

//Busqueda por ID
router.get('/pokemons/:source/:idPokemon', async (req, res) => {
    try {
        const source = req.params.source;
        const idPokemon = req.params.idPokemon;
        if(source === 'db'){
            const pokemon = await Pokemon.findOne({
                where: { 
                    id: idPokemon 
                },
                include: Type
            });
            if (pokemon) {
                const dbPokemons = {id: pokemon.id, source: 'db', name: pokemon.dataValues.name, height: pokemon.dataValues.altura, weight: pokemon.dataValues.peso, sprites:{other:{home: {front_default:pokemon.dataValues.imagen}}}, stats:[{base_stat: pokemon.dataValues.vida}, {base_stat: pokemon.dataValues.defensa}, {base_stat: pokemon.dataValues.ataque}, {base_stat: pokemon.dataValues.velocidad}], types: pokemon.dataValues.types ? pokemon.dataValues.types.map(type => ({ type: { name: type.name } })) : []};
                res.json(dbPokemons);
            }
        } 
        else if (source === 'api'){
            try {
                const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${idPokemon}`);
                const apiPokemon = response.data;
                res.json({...apiPokemon, source: 'api'});
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    res.status(404).send('Pokémon not found');
                } else {
                    console.error(error);
                    res.status(500).send('Error fetching Pokémon from API');
                }
            }
        } 
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
  });

  router.get('/types', async (req, res) => {
    try {
        const types = await Type.findAll();
        res.json(types);
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
});

// Middleware de validación
function validatePokemon(req, res, next) {
    const { name, vida, ataque, defensa, imagen, tipo, velocidad, peso, altura } = req.body;

    // Validar los datos aquí
    if (typeof name !== 'string' || typeof imagen !== 'string' || typeof vida !== 'number' || typeof ataque !== 'number' || typeof defensa !== 'number' || typeof velocidad !== 'number' || typeof peso !== 'number' || typeof altura !== 'number') {
        return res.status(400).send('Los datos del pokemon son inválidos');
    }  

    // Si todo está bien, pasar al siguiente middleware o controlador
    next();
}

router.post('/pokemons',validatePokemon,  async (req,res) => {
    let { name, vida, ataque, defensa, imagen, tipo, velocidad, peso, altura } = req.body;
    
    let tipos = await Type.findAll({
        where:{
            name: tipo
        }
    })

    // Convertir el array 'tipo' en una cadena de texto
    if (Array.isArray(tipo)) {
        tipo = tipo.join(", ");
    }

    //Nombre a lowercase
    name = name.toLowerCase();

    let newPokemon = await Pokemon.create({ name, vida, ataque, defensa, imagen, velocidad, peso, altura });
    await newPokemon.addType(tipos)
    console.log(newPokemon)
    
    res.send("El Pokemon fue creado")
})

module.exports = router;
