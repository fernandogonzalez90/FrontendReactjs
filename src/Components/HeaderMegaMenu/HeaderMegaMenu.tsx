import {
  Group,
  Button,
  Divider,
  Box,
  Drawer,
  ScrollArea,
  rem,
  NavLink,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useNavigate } from 'react-router-dom';
import classes from './HeaderMegaMenu.module.css';

export function HeaderMegaMenu() {
  const [drawerOpened, { close: closeDrawer }] = useDisclosure(false);
  const navigate = useNavigate();

  const handleNavigation = (href: string) => {
    closeDrawer();
    navigate(href);
  };

  return (
    <Box pb={120}>
      <header className={classes.header}>
        {/* ... (el resto del código del header permanece igual) ... */}
      </header>
      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Fernando Gonzalez"
        hiddenFrom="sm"
        zIndex={1000000}
        c="cyan"
      >
        <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
          <Divider my="sm" color="cyan.3" />
          <NavLink
            label="Home"
            onClick={() => handleNavigation('/')}
          />
          <NavLink
            label="Certificaciones"
            onClick={() => handleNavigation('#certificaciones')}
          />
          <NavLink
            label="Skills"
            onClick={() => handleNavigation('#skills')}
          />
          <NavLink
            label="Portafolio"
            onClick={() => handleNavigation('#portafolio')}
          />
          <NavLink
            label="Contacto"
            onClick={() => handleNavigation('#contacto')}
          />
          <Divider my="sm" color="cyan.3" />
          <Group justify="center" grow pb="xl" px="md">
            <Button
              variant="light"
              color="cyan"
              onClick={() => {
                closeDrawer();
                navigate('/login');
              }}
            >
              Log In
            </Button>
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}