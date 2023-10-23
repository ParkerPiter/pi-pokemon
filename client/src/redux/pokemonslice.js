import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';

export const pokemonSlice = createSlice({
    name: 'pokemons',
    initialState:{
        allPokemons: [],
        pokemons:[],
        types:[],
        loading: false,
        error: null,
        selectedPokemon: null,
        sortDirection: 'asc',
        sortDirection: 'desc',
        searchedPokemon: null,
    },
    reducers:{
        getPokemonsStart: (state) => {
            state.loading = true;
        },
        getPokemonsSuccess: (state, action) => {
            state.loading = false;
            state.allPokemons = action.payload;
            state.pokemons = action.payload;
        },
        getPokemonsFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        getPokemonByIdSuccess: (state, action) => {
            state.loading = false;
            state.selectedPokemon = action.payload;
        },
        getTypesSuccess: (state, action) => {
            state.types = action.payload;
        },
        limpiarFiltros: (state) => {
            state.pokemons = [...state.allPokemons];
        },
        sortPokemonsAlfabeticamente: (state) => {
            if (state.sortDirection === 'asc') {
                state.pokemons.sort((a, b) => a.name.localeCompare(b.name));
                state.sortDirection = 'desc';
            } else {
                state.pokemons.sort((a, b) => b.name.localeCompare(a.name));
                state.sortDirection = 'asc';
            }
        },
        sortPokemonsByAttack: (state) => {
            if (state.sortDirection === 'desc') {
                state.pokemons.sort((a, b) => b.stats[1].base_stat - a.stats[1].base_stat);
                state.sortDirection = 'asc';
            } else {
                state.pokemons.sort((a, b) => a.stats[1].base_stat - b.stats[1].base_stat);
                state.sortDirection = 'desc';
            }
        },
        filterPokemonsByType: (state, action) => {
            state.pokemons = state.allPokemons.filter(pokemon =>{
                return pokemon.types.some(tipo =>{ 
                    return action.payload == tipo.type.name })
                });
        },
        searchPokemonByNameStart: (state) => {
            state.loading = true;
        },
        searchPokemonByNameSuccess: (state, action) => {
            state.loading = false;
            state.pokemons = [action.payload];
        },
        searchPokemonByNameFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    }
})

export const { getPokemonsStart, getPokemonsSuccess, getPokemonsFailure, getPokemonByIdSuccess, getTypesSuccess, sortPokemonsAlfabeticamente, sortPokemonsByAttack, limpiarFiltros, filterPokemonsByType } = pokemonSlice.actions;
//Fetch de los Pokemons
export const fetchPokemons = () => async dispatch => {
    dispatch(getPokemonsStart());
    try {
        const response = await axios.get('http://localhost:3001/pokemons');
        dispatch(getPokemonsSuccess(response.data));
    } catch (error) {
        dispatch(getPokemonsFailure(error.message));
    }
};
//Fetch de tipos
export const fetchPokemonById = (source, idPokemon) => async dispatch => {
    dispatch(getPokemonsStart());
    try {
      const response = await axios.get(`http://localhost:3001/pokemons/${source}/${idPokemon}`);
      dispatch(getPokemonByIdSuccess(response.data));
    } catch (error) {
      dispatch(getPokemonsFailure(error.message));
    }
};
//Funcion de seleccionar tipos
export const selectSelectedPokemon = state => state.pokemons.selectedPokemon;
export const fetchTypes = () => async dispatch => {
    try {
        const response = await axios.get('http://localhost:3001/types');
        console.log("Fetched types: ", response.data);
        dispatch(getTypesSuccess(response.data));
    } catch (error) {
        console.error(error);
    }
};
//Funcion de search
export const searchPokemonByName = (name) => async (dispatch) => {
    try {
        dispatch(pokemonSlice.actions.searchPokemonByNameStart());
        const response = await axios.get(`http://localhost:3001/pokemons/name?name=${name}`);
        // if (response.data.length === 0) { // Si la respuesta es vacía, lanza un error
        //     throw new Error('El Pokémon no existe');
        // }
        dispatch(pokemonSlice.actions.searchPokemonByNameSuccess(response.data));
    } catch (err) {
        if (err.response && err.response.status === 404) {
            alert('Pokémon no encontrado'); // Muestra una alerta si el error es 404
        }
        dispatch(pokemonSlice.actions.searchPokemonByNameFailure(err.toString()));
    }
};

export default pokemonSlice.reducer;