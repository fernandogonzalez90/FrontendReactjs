import React from 'react';
import { Button, TextInput } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

const Login: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Aquí iría tu lógica de autenticación
    onLogin();
    navigate('/admin');
  };

  return (
    <div>
      <h1>Login</h1>
      <TextInput placeholder="Username" />
      <TextInput placeholder="Password" type="password" />
      <Button onClick={handleLogin}>Login</Button>
    </div>
  );
};

export default Login;