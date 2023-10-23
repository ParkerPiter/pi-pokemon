import style from './Home.module.css';
import Navbar from '../../components/Navbar/Navbar'
import Cards from '../../components/Cards/Cards';
import Search from '../../components/Searchbar/Search';

const Home = ({pokemons, paginate, totalPK, currentPage}) =>{
    //Paginado
    const pageNumbers = [];
    console.log("soy el total:",totalPK)
    const pokemonsPerPage = 12;
    for (let i = 1; i <= Math.ceil(totalPK / pokemonsPerPage); i++) {
        pageNumbers.push(i);
    }
    return (
        <>  
            <header className={style.head}>
                <Navbar />
                <Search />
            </header>
            <main>
                <div className={style.contenedor}>   
                    <Cards pokemons={pokemons} />
                </div>
                <nav className={style.container}>
                        <button className={style.botones} onClick={() => currentPage > 1 && paginate(currentPage - 1)}>
                            Atrás
                        </button>
                        <span>Página {currentPage} de {pageNumbers.length}</span>
                        <button className={style.botones}  onClick={() => currentPage < pageNumbers.length && paginate(currentPage + 1)}>
                            Adelante
                        </button>
                </nav>
            </main>
        </>
    )
}

export default Home;