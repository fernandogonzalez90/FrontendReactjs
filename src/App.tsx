import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import PublicComponent from './Components/PublicComponent/PublicComponent';
import Login from './Components/Login/Login';
import { Admin } from './Components/Admin/Admin';
import ProtectedRoute from './Components/ProtectedRoute';
import { Servicios } from './Components/Servicios/Servicios';
import "@mantine/core/styles.css";

const App: React.FC = () => {

  return (
    <MantineProvider defaultColorScheme="dark">
      <Router>
        <Routes>
          <Route path='/' element={<PublicComponent></PublicComponent>} />
          <Route path="/login" element={<Login />} />
          <Route path='/servicios' element={<Servicios></Servicios>} />
          <Route
            path="https://devgonzalezf.com.ar/admin/"
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </MantineProvider>
  );
};

export default App;