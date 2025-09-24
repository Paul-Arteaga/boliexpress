import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom'; // Importa las rutas necesarias
import { auth } from './firebase';
import Login from './Login';  // Importa el componente Login
import Dashboard from './Dashboard'; // Importa el componente Dashboard
import PrivateRoute from './PrivateRoute'; // Asegúrate de proteger tu ruta privada

function App() {
  const [user, setUser] = useState(null);  // Estado para almacenar el usuario
  const navigate = useNavigate();

  // Verifica si el usuario está autenticado
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);  // Si el usuario está autenticado, lo guardamos en el estado
        navigate('/dashboard');  // Redirigir a dashboard si está autenticado
      } else {
        setUser(null);  // Si no está autenticado, limpiamos el estado
        navigate('/login');  // Redirigir al login si no está autenticado
      }
    });

    return () => unsubscribe();  // Limpiar el listener al desmontar el componente
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await auth.signOut();  // Cerrar sesión
      console.log("Usuario cerrado sesión");
      navigate('/login');  // Redirigir al login después de cerrar sesión
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <div>
      <Routes>
        {/* La ruta para el Login */}
        <Route path="/login" element={<Login />} />

        {/* Ruta protegida para el Dashboard */}
        <Route 
          path="/dashboard" 
          element={
            <PrivateRoute>
              <Dashboard user={user} handleLogout={handleLogout} />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;

