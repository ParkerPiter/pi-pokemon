import { useDispatch, useSelector } from 'react-redux';
import { fetchPokemons } from './redux/pokemonslice';
import { useState, useEffect } from 'react'
import { Routes, Route, useParams, Form } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Tapa from './Pages/Tapa/Tapa';
import Details from './Pages/Details/Details';
import Formulario from './Pages/Form/Form'; 

function App() {
  
  //Dispatch de los pokemons
  const dispatch = useDispatch();
  const { pokemons, loading, error } = useSelector(state => state.pokemons);

    useEffect(() => {
        dispatch(fetchPokemons());
    }, [dispatch]);

    useEffect(() => {
      console.log("Soy los pokemons",pokemons);
      // console.log(pokemons[5]?.types);
    },[pokemons])

    //Estados del paginado
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(12);
    // Función para cambiar la página
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <Routes>
        <Route path='/' element={<Tapa/>} />
        <Route path='/pokemons' element={<Home 
          pokemons={pokemons ? pokemons.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage) : []}
          paginate={paginate}
          totalPK={pokemons ? pokemons.length : 0}
          currentPage={currentPage}
          />
          }/>
        <Route path='/pokemons/details/:source/:idPokemon' element={<Details/>}/>
        <Route path='/pokemons/crear' element={<Formulario/>} /> 
      </Routes>
    </div>
  )
}

export default App
