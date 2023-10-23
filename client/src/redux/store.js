import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk';
import pokemonReducer from './pokemonslice';

export const store = configureStore({
    reducer: {
        pokemons: pokemonReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }).concat(thunk),
});