import Card from '../Card/Card'
import style from './Cards.module.css'

const Cards = ({pokemons}) =>{
    return(
        <div className={style.container}>
            {pokemons.map((pokemon)=>{
                console.log("cards:",pokemon)
                return(
                    <Card
                        key={pokemon.order}
                        id={pokemon.id}
                        name={pokemon.name}
                        height={pokemon.height}
                        weight={pokemon.weight}
                        imagen={pokemon.sprites.other.home.front_default}
                        types={pokemon.types || []}
                        source={pokemon.source}
                    />
                )
            })}
        </div>
    )
}
export default Cards;