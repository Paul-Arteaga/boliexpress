import React from 'react';
import { Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { auth } from './firebase';

// Componente para proteger rutas
const PrivateRoute = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return () => unsubscribe();
  }, []);

  if (user === null) {
    // Mientras verificamos el estado de autenticación
    return <div>Loading...</div>;
  }

  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
