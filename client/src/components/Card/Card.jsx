import { Link } from 'react-router-dom';
import style from './Card.module.css'

const Card = ({ id, name, imagen, types = [], source}) => {

     // Crear una cadena de texto con todos los nombres de los tipos
     const typeNames = types.map(typeObj => typeObj.type ? typeObj.type.name : '').join(', ');

     // Capitalizar el nombre
     const capitalized_name = name.charAt(0).toUpperCase() + name.slice(1)

    return(
        <div className={style.card}>
            <h2 className={`${style.info} ${style.name}`}>{capitalized_name}</h2>
            <img className={style.imagen} src={imagen} alt="" />
            <h2 className={`${style.type} ${style.info}`}>Tipos: {typeNames}</h2> {/* Mostrar la cadena de texto */}
            <Link to={`/pokemons/details/${source}/${id}`}>
                    <button className={style.boton}>mas información</button>
            </Link>
        </div>
    )
}
export default Card;