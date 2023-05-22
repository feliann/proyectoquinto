import './App.css';
import { sendEmail, signInWithGoogle, signOutWithGoogle } from './firebase';

function App() {
  return (
    <div className="App">
      <h1>Aplicación de Firebase</h1>
      <div className="buttons">
      <button className="login-with-google-btn" onClick={signInWithGoogle}>Iniciar sesión</button>
        <button className="loginout-with-google-btn" onClick={signOutWithGoogle}>Cerrar sesión</button>
        <button onClick={sendEmail}>Enviar correo electrónico</button>
      </div>
      {localStorage.getItem("name") && (
        <div className="user-info">
          <h2>Información del usuario</h2>
          <p>Nombre: {localStorage.getItem("name")}</p>
          <p>Correo electrónico: {localStorage.getItem("email")}</p>
          <img src={localStorage.getItem("profilePic")} alt="Foto de perfil" />
        </div>
      )}
    </div>
  );
}

export default App;
