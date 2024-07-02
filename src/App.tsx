import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import "@mantine/core/styles.css";
import PublicComponent from './Components/PublicComponent/PublicComponent';
import Login from './Components/Login/Login';
import { Admin } from './Components/Admin/Admin';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  const login = () => {
    // Aquí iría tu lógica de autenticación con JWT
    // Por ahora, simplemente cambiamos el estado
    setIsAuthenticated(true);
  };

  const logout = () => {
    // Lógica para cerrar sesión
    setIsAuthenticated(false);
  };

  return (
    <MantineProvider defaultColorScheme="dark">
      <Router>
        <Routes>
          <Route path="/" element={<PublicComponent onLogin={() => navigate('/login')} />} />
          <Route path="/login" element={<Login onLogin={login} />} />
          <Route 
            path="/admin" 
            element={
              isAuthenticated ? (
                <Admin onLogout={logout} />
              ) : (
                <Navigate to="/login" replace />
              )
            } 
          />
        </Routes>
      </Router>
    </MantineProvider>
  );
};

export default App;