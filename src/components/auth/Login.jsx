import React, { useState } from 'react';
import { signInWithGoogle, registerWithEmailPassword, loginWithEmailPassword, recoverPassword, signInWithPhone } from '../../services/firebase';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [recaptchaContainer, setRecaptchaContainer] = useState(null);
  const [resetEmail, setResetEmail] = useState("");
  const [showPasswordReset, setShowPasswordReset] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      await registerWithEmailPassword(email, password);
      setSuccess("Registro exitoso. Redirigiendo...");
      setTimeout(() => navigate('/dashboard'), 1500);
    } catch (error) {
      setError(error.message || "Error al registrar");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      await loginWithEmailPassword(email, password);
      setSuccess("Inicio de sesión exitoso");
      navigate('/dashboard');
    } catch (error) {
      setError(error.message || "Error al iniciar sesión");
    }
  };

  const handlePhoneLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      await signInWithPhone(phoneNumber, recaptchaContainer);
      setSuccess("Inicio de sesión con teléfono exitoso");
      navigate('/dashboard');
    } catch (error) {
      setError(error.message || "Error al iniciar sesión con teléfono");
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      await recoverPassword(resetEmail);
      setSuccess("Correo de recuperación enviado. Revisa tu bandeja de entrada.");
      setResetEmail("");
      setShowPasswordReset(false);
    } catch (error) {
      setError(error.message || "Error al enviar correo de recuperación");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl">
        {/* Logo y Título */}
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-2">BoliExpress</h2>
          <p className="text-gray-600">Sistema de envío de divisas</p>
        </div>

        {/* Mensajes de error y éxito */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
            {success}
          </div>
        )}

        {/* Formulario de Email/Contraseña */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Correo electrónico asociado a BoliExpress
            </label>
            <input
              id="email"
              type="email"
              required
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-md"
          >
            Iniciar sesión
          </button>
        </form>

        {/* Separador */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">O continúa con</span>
          </div>
        </div>

        {/* Inicio de sesión con Google */}
        <div>
          <button
            onClick={signInWithGoogle}
            className="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors shadow-sm"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Iniciar sesión con Google
          </button>
        </div>

        <button
          onClick={handleRegister}
          className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors"
        >
          Crear nueva cuenta
        </button>

        {/* Recuperación de contraseña */}
        <div className="text-center">
          <button
            onClick={() => setShowPasswordReset(!showPasswordReset)}
            className="text-sm text-indigo-600 hover:text-indigo-800"
          >
            ¿Olvidaste tu contraseña?
          </button>
        </div>

        {showPasswordReset && (
          <form onSubmit={handlePasswordReset} className="mt-4 p-4 bg-gray-50 rounded-lg space-y-4">
            <div>
              <label htmlFor="resetEmail" className="block text-sm font-medium text-gray-700 mb-1">
                Correo electrónico asociado a BoliExpress
              </label>
              <input
                id="resetEmail"
                type="email"
                required
                placeholder="tu@email.com"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
            >
              Recuperar Contraseña
            </button>
          </form>
        )}

        {/* Autenticación por Teléfono */}
        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Iniciar sesión con teléfono</h3>
          <form onSubmit={handlePhoneLogin} className="space-y-4">
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Número de teléfono
              </label>
              <input
                id="phone"
                type="text"
                placeholder="+56 9 1234 5678"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
              />
            </div>
            <div ref={setRecaptchaContainer} className="hidden"></div>
            <button
              type="submit"
              className="w-full bg-gray-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-700 transition-colors"
            >
              Iniciar sesión con Teléfono
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;

