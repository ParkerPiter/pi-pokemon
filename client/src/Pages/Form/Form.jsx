import style from './Form.module.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector} from 'react-redux';
import { fetchTypes } from '../../redux/pokemonslice';
import { Link } from 'react-router-dom'


const Formulario = () => {
    //Dispatch de tipos
    const dispatch = useDispatch();
    const types = useSelector(state => state.pokemons.types);
    useEffect(() => {
        dispatch(fetchTypes());
    }, [dispatch]);

    //Estados para las validaciones de errores
    const [errors, setErrors] = useState({});
    const [name, setName] = useState("");
    const [altura, setAltura] = useState("");
    const [peso, setPeso] = useState("");
    const [vida, setVida] = useState("");
    const [ataque, setAtaque] = useState("");
    const [defensa, setDefensa] = useState("");
    const [velocidad, setVelocidad] = useState("");
    const [type, setType] = useState([]);
    const [selectedType, setSelectedType] = useState("");

    //Validacion de tipos en cuanto a cantidad
    function handleTypeChange(event) {
        const selectedType = event.target.value;
        if (type.length < 2) {
            setType(prevTypes => [...prevTypes, selectedType]);
            setErrors({...errors, type: null}); // Borra el mensaje de error
        } else {
            alert('Solo puedes seleccionar 2 tipos de Pokemon');
        }
    }
    
    //Funciones de validaciones:
    function validateInput(value, campo) {
        if (campo === 'name'){
            let name = !value.trim() || !/^[a-zA-Z\s]+$/.test(value.trim()) || value.length > 15 ? 'El nombre es obligatorio, no puede contener números y debe tener menos de 15 caracteres' : null;
            setErrors({...errors, name});
            setName(value);
        }
        else {
            let number = !value.trim() || !/^\d+$/.test(value.trim()) || value > 250 ? 'Este campo es obligatorio, solo puede contener números y el valor máximo es 250' : null;
            setErrors({...errors, [campo]: number});
            switch(campo) {
                case 'altura':
                    setAltura(value);
                    break;
                case 'peso':
                    setPeso(value);
                    break;
                case 'vida':
                    setVida(value);
                    break;
                case 'ataque':
                    setAtaque(value);
                    break;
                case 'defensa':
                    setDefensa(value);
                    break;
                case 'velocidad':
                    setVelocidad(value);
                    break;
                default:
                    break;
            }
        }
    }

    //Validación de todo el formulario
    const handleSubmit = async (event) => {
        event.preventDefault();
    
        // Validar el formulario
        const errors = {
            name: !name.trim() || !/^[a-zA-Z\s]+$/.test(name.trim()) || name.length > 15 ? 'El nombre es obligatorio, no puede contener números y debe tener menos de 15 caracteres' : null,
            altura: !altura.trim() || !/^\d+$/.test(altura.trim()) || altura > 250 ? 'La altura es obligatoria, solo puede contener números y el valor máximo es 250' : null,
            peso: !peso.trim() || !/^\d+$/.test(peso.trim()) || peso > 250 ? 'El peso es obligatorio, solo puede contener números y el valor máximo es 250' : null,
            vida: !vida.trim() || !/^\d+$/.test(vida.trim()) || vida > 250 ? 'La vida es obligatoria, solo puede contener números y el valor máximo es 250' : null,
            ataque: !ataque.trim() || !/^\d+$/.test(ataque.trim()) || ataque > 250 ? 'El ataque es obligatorio, solo puede contener números y el valor máximo es 250' : null,
            defensa: !defensa.trim() || !/^\d+$/.test(defensa.trim()) || defensa > 250 ? 'La defensa es obligatoria, solo puede contener números y el valor máximo es 250' : null,
            velocidad: !velocidad.trim() || !/^\d+$/.test(velocidad.trim()) || velocidad > 250 ? 'La velocidad es obligatoria, solo puede contener números y el valor máximo es 250' : null,
            type: type.length === 0 || type.length > 2 ? 'Debes seleccionar al menos 1 tipo y no más de 2 tipos' : null,
        };
        setErrors(errors);
        if (Object.values(errors).some(error => error !== null)) {
            return;
        }
        // Crear pokemon
        try {
            const data = {
                name,
                altura: Number(altura),
                peso: Number(peso),
                vida: Number(vida),
                ataque: Number(ataque),
                defensa: Number(defensa),
                velocidad: Number(velocidad),
                imagen: 'https://kumoneko.com/cdn/shop/products/61um1Nc55hL._AC_SL1500.jpg?v=1595658738',
                tipo: type
            };
            
            const response = await axios.post('http://localhost:3001/pokemons', data);
            const responseData = response.data;
            alert(responseData);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className={style.contenedor}>
            <div className={style.container}>
                <h2 className={style.titulo}>Crea a tu Pokemon</h2>
                <form className={style.form} onSubmit={handleSubmit} >
                    <div className={style.info}>
                        <label className={style.data}>
                            Nombre:<input type="text" value={name} onChange={(e) => validateInput(e.target.value, 'name')} />
                            {errors.name && <p className={style.alert}>{errors.name}</p>}
                        </label>
                        <label className={style.data}>
                            Altura:<input type="text" value={altura} onChange={(e) => validateInput(e.target.value, 'altura')} />
                            {errors.altura && <p className={style.alert}>{errors.altura}</p>}
                        </label>
                        <label className={style.data}>
                            Peso:<input type="text" value={peso} onChange={(e) => validateInput(e.target.value, 'peso')} />
                            {errors.peso && <p className={style.alert}>{errors.peso}</p>}
                        </label>
                        <label className={style.data}>
                            Vida:<input type="text" value={vida} onChange={(e) => validateInput(e.target.value, 'vida')} />
                            {errors.vida && <p className={style.alert}>{errors.vida}</p>}
                        </label>
                        <label className={style.data}>
                            Ataque:<input type="text" value={ataque} onChange={(e) => validateInput(e.target.value, 'ataque')} />
                            {errors.ataque && <p className={style.alert}>{errors.ataque}</p>}
                        </label>
                        <label className={style.data}>
                            Defensa: <input type="text" value={defensa} onChange={(e) => validateInput(e.target.value, 'defensa')} />
                            {errors.defensa && <p className={style.alert}>{errors.defensa}</p>}
                        </label>
                        <label className={style.data}>
                            Velocidad:<input type="text" value={velocidad} onChange={(e) => validateInput(e.target.value, 'velocidad')} />
                            {errors.velocidad && <p className={style.alert}>{errors.velocidad}</p>}
                        </label>
                        <label className={style.data} htmlFor="type">Tipos: </label>
                        <select
                            className={style.select}
                            id="type"
                            value={type}
                            onChange={handleTypeChange}>
                            {types.map((type) => (
                                <option key={type.id} value={type.name}>
                                    {type.name}
                                </option>
                            ))}
                        </select>
                        <p className={style.tipos}>Tipos escogidos: {type.join(',')}</p>
                        {errors.type && <p className={style.alert}>{errors.type}</p>}
                    </div>
                    <button className={style.botones} type="submit">Crear Pokemon</button>
                    <Link to='/pokemons'>
                        <button className={style.botones} >Volver</button>
                    </Link>
                </form>
            </div>
            <img className={`${style.imagen} ${style.shakevertical}`} src="https://images.wikidexcdn.net/mwuploads/wikidex/thumb/e/ec/latest/20170907153819/Pikachu_original.png/800px-Pikachu_original.png" alt="" />
        </div>
    );
};

export default Formulario;
