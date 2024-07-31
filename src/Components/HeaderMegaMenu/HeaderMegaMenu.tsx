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

  return (
    <Box pb={120}>
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          <Text ta="center" fw={700} c="cyan.5">Fernando Gonzalez</Text>
          <Group h="100%" gap={0} visibleFrom="sm">
            <Anchor href="/" underline="never" px="md">
              <Text c="cyan.3">
                Home
              </Text>
            </Anchor>
            <Anchor href="#certificaciones" underline="never" px="md">
              <Text c="cyan.3">
                Certificaciones
              </Text>
            </Anchor>
            <Anchor href="#skills" underline="never" px="md">
              <Text c="cyan.3">
                Skills
              </Text>
            </Anchor>
            <Anchor href="#portafolio" underline="never" px="md">
              <Text c="cyan.3">
                Portafolio
              </Text>
            </Anchor>
            <Anchor href="#contacto" underline="never" px="md">
              <Text c="cyan.3">
                Contacto
              </Text>
            </Anchor>
          </Group>

          <Group visibleFrom="sm">
            <Button variant="subtle" color="cyan" onClick={() => navigate('/login')}>Login</Button>
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
            href="#required-for-focus"
            label="Home"
          />
          <NavLink
            href="#required-for-focus"
            label="Certificaciones"
          />
          <NavLink
            href="#required-for-focus"
            label="Skills"
          />
          <NavLink
            href="#required-for-focus"
            label="Portafolio"
          />
          <NavLink
            href="#required-for-focus"
            label="Contacto"
          />
          <Divider my="sm" color="cyan.3" />

          <Group justify="center" grow pb="xl" px="md">
            <Button variant="light" color="cyan">Log In</Button>
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}