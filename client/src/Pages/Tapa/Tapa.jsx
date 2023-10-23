import logo from '../../assets/Pokémon logo.png';
import style from './Tapa.module.css'
import { Link } from "react-router-dom";

const Tapa = ()=>{
    return(
         <div className={style.contenedor}>
             <img src={logo} className={style.logo} alt="logo" />
            <Link to='/pokemons'><button className={style.boton}>IR AL HOME</button></Link>
        </div>
    )
}

export default Tapa;