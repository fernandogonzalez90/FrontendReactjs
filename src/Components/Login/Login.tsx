import React, { useState, FormEvent } from 'react';
import authService from '../AuthServices';
import {
  TextInput,
  PasswordInput,
  Paper,
  Title,
  Container,
  Button,
} from '@mantine/core';
import classes from './Login.module.css'

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await authService.login(username, password);
      window.location.href = 'https://backendjango.ddns.net/admin/';
    } catch (error) {
      console.error('Error de inicio de sesión:', error);
    }
  };

  return (
    <>
      <Container size={420} my={40}>
        <Title ta="center" className={classes.title} c='cyan'>
          Iniciar Sesion
        </Title>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <form onSubmit={handleLogin}>
            <TextInput type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username" required />
            <PasswordInput type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password" required mt="md" />
            <Button fullWidth mt="xl" type="submit" variant='light' color="cyan">
              Sign in
            </Button>
          </form>
        </Paper>
      </Container></>
  );
};

export default Login;