import {
  Group,
  Button,
  Text,
  Anchor,
  Divider,
  Box,
  Burger,
  Drawer,
  ScrollArea,
  rem,
  NavLink,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from './HeaderMegaMenu.module.css';
import { useNavigate } from 'react-router-dom';

export function HeaderMegaMenu() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const navigate = useNavigate();

  const handleNavLinkClick = (href: string) => {
    closeDrawer();
    if (href.startsWith('#')) {
      window.location.hash = href;
    } else {
      navigate(href);
    }
  };

  return (
    <Box pb={120}>
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          <Text ta="center" fw={700} c="cyan.5">Fernando Gonzalez</Text>
          <Group h="100%" gap={0} visibleFrom="sm">
            <Anchor href="/" underline="never" px="md">
              <Text c="cyan.3">Home</Text>
            </Anchor>
            <Anchor href="#certificaciones" underline="never" px="md">
              <Text c="cyan.3">Certificaciones</Text>
            </Anchor>
            <Anchor href="#skills" underline="never" px="md">
              <Text c="cyan.3">Skills</Text>
            </Anchor>
            <Anchor href="#portafolio" underline="never" px="md">
              <Text c="cyan.3">Portafolio</Text>
            </Anchor>
            <Anchor href="#contacto" underline="never" px="md">
              <Text c="cyan.3">Contacto</Text>
            </Anchor>
          </Group>
          <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
        </Group>
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
            href="#home"
            label="Home"
            onClick={() => handleNavLinkClick('/')}
          />
          <NavLink
            href="#certificaciones"
            label="Certificaciones"
            onClick={() => handleNavLinkClick('#certificaciones')}
          />
          <NavLink
            href="#skills"
            label="Skills"
            onClick={() => handleNavLinkClick('#skills')}
          />
          <NavLink
            href="#portafolio"
            label="Portafolio"
            onClick={() => handleNavLinkClick('#portafolio')}
          />
          <NavLink
            href="#contacto"
            label="Contacto"
            onClick={() => handleNavLinkClick('#contacto')}
          />
          <Divider my="sm" color="cyan.3" />
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
