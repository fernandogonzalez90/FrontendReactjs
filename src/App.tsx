import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import PublicComponent from './Components/PublicComponent/PublicComponent';
import Login from './Components/Login/Login';
import { Admin } from './Components/Admin/Admin';
import "@mantine/core/styles.css";
import ProtectedRoute from './Components/ProtectedRoute';

const App: React.FC = () => {

  return (
    <MantineProvider defaultColorScheme="dark">
      <Admin></Admin>
      {/* <Router>
        <Routes>
          <Route path='/' element={<PublicComponent></PublicComponent>} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router> */}
    </MantineProvider>
  );
};

export default App;