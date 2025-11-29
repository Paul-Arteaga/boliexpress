import React, { useState } from 'react';
import { signInWithGoogle, registerWithEmailPassword, loginWithEmailPassword, recoverPassword, signInWithPhone } from './firebase';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [recaptchaContainer, setRecaptchaContainer] = useState(null);
  const [resetEmail, setResetEmail] = useState(""); // Para la recuperación de contraseña
  const navigate = useNavigate(); // Para redirigir a otras páginas

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await registerWithEmailPassword(email, password);
      console.log("Registro exitoso");
    } catch (error) {
      console.error("Error al registrar:", error.message);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await loginWithEmailPassword(email, password);
      console.log("Inicio de sesión exitoso");
      navigate('/dashboard');  // Redirigir al dashboard después de iniciar sesión
    } catch (error) {
      console.error("Error al iniciar sesión:", error.message);
    }
  };

  const handlePhoneLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithPhone(phoneNumber, recaptchaContainer);
      console.log("Inicio de sesión con teléfono exitoso");
      navigate('/dashboard');  // Redirigir al dashboard
    } catch (error) {
      console.error("Error al iniciar sesión con teléfono:", error.message);
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    try {
      await recoverPassword(resetEmail);
      console.log("Correo de recuperación enviado a:", resetEmail);
    } catch (error) {
      console.error("Error al enviar correo de recuperación:", error.message);
    }
  };

  return (
    <div>
      <h2>Iniciar sesión</h2>

      {/* Google */}
      <button onClick={signInWithGoogle}>Iniciar sesión con Google</button><br /><br />

      {/* Correo Electrónico/Contraseña */}
      <form onSubmit={handleLogin}>
        <input
          type="email" 
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /><br /><br />
        <button type="submit">Iniciar sesión</button>
      </form> <br />
      <button onClick={handleRegister}>Registrarse</button> <br /><br />

      {/* Autenticación por Teléfono */}
      <form onSubmit={handlePhoneLogin}>
        <input
          type="text"
          placeholder="Número de teléfono"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        /><br /><br />
        <div ref={setRecaptchaContainer}></div> {/* ReCaptcha Invisible */}
        <button type="submit">Iniciar sesión con Teléfono</button>
      </form>

      {/* Recuperación de Contraseña */}
      <h3>¿Olvidaste tu contraseña?</h3>
      <form onSubmit={handlePasswordReset}>
        <input
          type="email"
          placeholder="Correo electrónico para recuperación"
          value={resetEmail}
          onChange={(e) => setResetEmail(e.target.value)}
        /><br /><br />
        <button type="submit">Recuperar Contraseña</button>
      </form>
    </div>
  );
}

export default Login;
