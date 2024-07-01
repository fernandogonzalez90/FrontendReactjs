import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Components/Login/Login';
import authService from './Components/AuthServices';
import { HeaderMegaMenu } from './Components/HeaderMegaMenu/HeaderMegaMenu';
import PublicComponent from './Components/PublicComponent/PublicComponent';
import { NavbarSearch } from './Components/Admin/Admin';
import { MantineProvider } from '@mantine/core';

const App: React.FC = () => {
  return (
    <PublicComponent></PublicComponent>

  );
};

export default App;