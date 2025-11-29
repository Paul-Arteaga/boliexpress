import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { auth } from './services/firebase';
import Login from './components/auth/Login';
import Dashboard from './components/Dashboard';
import PrivateRoute from './components/auth/PrivateRoute';

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
    <div className="min-h-screen">
      <Routes>
        <Route path="/login" element={<Login />} />
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

