import style from './Search.module.css';
import my_image from '../../assets/Pokémon logo.png'
import { useDispatch, useSelector} from 'react-redux';
import { searchPokemonByName, limpiarFiltros } from '../../redux/pokemonslice';
import { useEffect } from 'react';

const Search = () =>{

    //Dispatch del search
    const dispatch = useDispatch();
    const searchedPokemon = useSelector(state => state.pokemons.searchedPokemon);
    const error = useSelector(state => state.pokemons.error); 

    useEffect(() => {
        if (error) {
            alert(error);
        }
    }, [error]);

    //Manejo del Search y errores
    const handleSubmit = (event) => {
        event.preventDefault();
        const name = event.target.elements[0].value;
        let name_1 = name.trim() && !/^[a-zA-Z\s]+$/.test(name.trim()) ? 'El nombre no puede contener números ni símbolos' : null;
        if (name_1) {
            alert(name_1);
        } else if (name.trim() === '') {
            dispatch(limpiarFiltros());
        } else {
            dispatch(searchPokemonByName(name));
        }
    };

    return(
        <div className={style.container}>
            <img className={style.logo} src={my_image} alt=""/>
            <form className={style.search} onSubmit={handleSubmit}>
                <input className={style.barra} type="search" placeholder="Buscar..."  />
                <button className={style.boton} type="submit">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#FFFFFF" className={`${style.icon} w-6 h-6`}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                </button>
            </form>
        </div>
    )
}
export default Search;