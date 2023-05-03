import logo from './img/Pokémon page .png';
import s from './App.module.css'

function App() {
  return (
    <div className={s.contenedor}>
        <img src={logo} className={s.logo} alt="logo" />
        <button className={s.boton}>IR AL HOME</button>
    </div>
  );
}

export default App;
