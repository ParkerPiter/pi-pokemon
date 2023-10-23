import { useDispatch, useSelector } from 'react-redux';
import { fetchPokemonById, selectSelectedPokemon } from "../../redux/pokemonslice";
import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import style from './Detail.module.css'

const Detail = ()=>{
    const { source, idPokemon } = useParams();
    const dispatch = useDispatch();
    const selectedPokemon = useSelector(selectSelectedPokemon);
    useEffect(() => {
        // Llama al action creator con los parámetros y el dispatch
        dispatch(fetchPokemonById(source, idPokemon));
        console.log(selectedPokemon);
      }, [source, idPokemon, dispatch]);
      console.log(selectedPokemon)

      //stats
      const getStats = (source, stats) => {
        if (source === 'api') {
          return [stats[0], stats[1], stats[2], stats[5]];
        } else if (source === 'db') {
          return [stats[0], stats[1], stats[2], stats[3]];
        }
      }
      let stats;
      if (selectedPokemon && selectedPokemon.stats) {
        stats = getStats(source, selectedPokemon.stats);
      }
      // Capitalizar nombres
      let capitalized_name = '';
      if (selectedPokemon && selectedPokemon.name) {
        capitalized_name = selectedPokemon.name.charAt(0).toUpperCase() + selectedPokemon.name.slice(1);
      }

      return(
        <div>
          {selectedPokemon && (
            <div className={style.container}>
              <div className={`${style.vibrate}`}>
                <img className={style.photo} src={selectedPokemon.sprites.other.home.front_default} alt={selectedPokemon.name} />
              </div>
              <div className={style.textContainer}>
                <h2 className={style.title}>#{capitalized_name}</h2>
                <div className={style.infodata}>
                  <div>
                    <p className={style.data}>Altura: {selectedPokemon.height}</p>
                    <p className={style.data}>Peso: {selectedPokemon.weight}</p>
                    <p className={style.data}>Vida: {selectedPokemon.stats[0].base_stat}</p>
                  </div>
                  <div>
                    <p className={style.data}>Ataque: {selectedPokemon.stats[1].base_stat}</p>
                    <p className={style.data}>Defensa: {selectedPokemon.stats[2].base_stat}</p>
                    <p className={style.data}>Velocidad: {selectedPokemon.stats[3].base_stat}</p>
                  </div>
                </div>
                <p className={`${style.data} ${style.type}`}>Tipos: {selectedPokemon.types.map(t => t.type.name).join(', ')}</p>
                <Link className={style.link} to='/pokemons'>
                  <div className={style.botones} >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" className={`w-6 h-6 ${style.icon}`}>
                      <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                    </svg>
                    <button className={style.boton}>Volver</button>
                  </div>
                </Link>
              </div>
            </div>
          )}
        </div>
      )
}
export default Detail;