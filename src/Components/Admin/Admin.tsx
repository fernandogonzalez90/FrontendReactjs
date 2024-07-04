import {
    Group,
    Button,
    UnstyledButton,
    Text,
    Divider,
    Center,
    Box,
    Burger,
    Drawer,
    ScrollArea,
    rem,
    useMantineTheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
    IconChevronDown,
} from '@tabler/icons-react';
import classes from './Admin.module.css';
import { AdmCertificaciones } from './AdmCertificaciones/AdmCertificaciones';



export function Admin() {
    const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
    const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
    const theme = useMantineTheme();

    return (
        <>
            <Box pb={120}>
                <header className={classes.header}>
                    <Group justify="space-between" h="100%">
                        <Text ta="center" c="cyan">Fernando Gonzalez</Text>
                        <Group h="100%" gap={0} visibleFrom="sm">
                            <a href="#" className={classes.link}>
                                General
                            </a>
                            <a href="#" className={classes.link}>
                                Certificaciones
                            </a>
                            <a href="#" className={classes.link}>
                                Skills
                            </a>
                            <a href="#" className={classes.link}>
                                Portafolio
                            </a>
                            <a href="#" className={classes.link}>
                                Contacto
                            </a>
                        </Group>

                        <Group visibleFrom="sm">
                            <Button variant="light" color="cyan" radius="xs">Sign up</Button>
                        </Group>

                        <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
                    </Group>
                </header>

                <Drawer
                    opened={drawerOpened}
                    onClose={closeDrawer}
                    size="100%"
                    padding="md"
                    title="Navigation"
                    hiddenFrom="sm"
                    zIndex={1000000}
                >
                    <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
                        <Divider my="sm" />

                        <a href="#" className={classes.link}>
                            Home
                        </a>
                        <UnstyledButton className={classes.link} onClick={toggleLinks}>
                            <Center inline>
                                <Box component="span" mr={5}>
                                    Features
                                </Box>
                            </Center>
                        </UnstyledButton>
                        <a href="#" className={classes.link}>
                            Learn
                        </a>
                        <a href="#" className={classes.link}>
                            Academy
                        </a>

                        <Divider my="sm" />

                        <Group justify="center" grow pb="xl" px="md">
                            <Button variant="default">Log in</Button>
                            <Button>Sign up</Button>
                        </Group>
                    </ScrollArea>
                </Drawer>
            </Box>
            <AdmCertificaciones></AdmCertificaciones>
        </>
    );
}