import style from './Navbar.module.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';
import { filterPokemonsByType, fetchTypes, sortPokemonsAlfabeticamente, sortPokemonsByAttack, limpiarFiltros } from '../../redux/pokemonslice';
import { useEffect } from 'react';

const Navbar = () =>{
    //Fetch Types:
    const dispatch = useDispatch();
    const types = useSelector(state => state.pokemons.types);
    useEffect(() => {
        dispatch(fetchTypes());
    }, [dispatch]);

    // Search
    const handleFilterChange = (event) => {
        console.log(event.target.value); // Imprime el valor seleccionado
        if (event.target.value === '') {
            dispatch(limpiarFiltros());
        } else {
            dispatch(filterPokemonsByType(event.target.value));
        }
    };

    //Alfabeticamente:
    const handleSortClick = () => {
        dispatch(sortPokemonsAlfabeticamente());
    };
    //Ataque:
    const handleSortByAttackClick = () => {
        dispatch(sortPokemonsByAttack());
    };
    //Limpiar filtros:
    const handleClearFiltersClick = () => {
        dispatch(limpiarFiltros());
    };  

    return(
        <div className={style.container}>
            <div className={style.select}>
                <label htmlFor="typesFilter"
                    className={style.label}
                    >Filtrar por tipo: </label>
                <select className={style.barra} id="typesFilter" onChange={handleFilterChange} >
                    <option value="">Todos</option>
                    {Object.values(types).map(type => (
                        <option key={type.id} value={type.name}>{type.name}</option>
                    ))}
                </select>
            </div>
            <button className={style.botones} onClick={handleSortClick} >Orden alfabetico</button>
            <button className={style.botones} onClick={handleSortByAttackClick}>Orden por ataque</button>
            <button className={style.botones} onClick={handleClearFiltersClick}>Borrar filtros</button>
            <Link to='/pokemons/crear'>
                <button className={style.botones}>Crear un Pokemon</button>
            </Link>
        </div>
    )
}
export default Navbar;


 /* VA DENTRO DEL LABEL :value={selectedType}
onChange={(event) => setSelectedTeam(event.target.value)}*/

/* VA DENTRO DEL OPTION: teams.map((team) => (
                            <option key={team.id} value={team.name}>
                                {team.name}
                            </option>
                    ))*/