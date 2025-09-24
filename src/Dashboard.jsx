import React from 'react';

function Dashboard({ user, handleLogout }) {
  return (
    <div>
      <h1>Bienvenido, {user.displayName}</h1>
      <p>Si deseas realizar un envío, escríbeme al +56 938866896.</p>

      <button onClick={handleLogout}>Cerrar sesión</button>
    </div>
  );
}

export default Dashboard;
