import {
    Group,
    Button,
    Text,
    Divider,
    Box,
    Burger,
    Drawer,
    ScrollArea,
    rem,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from './Admin.module.css';
import { AdmCertificaciones } from './AdmCertificaciones/AdmCertificaciones';
import { useState } from 'react';
import { AdmGeneral } from './AmdGeneral/AmdGeneral';



export function Admin() {
    const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
    const [activeComponent, setActiveComponent] = useState<string | null>(null);

    const renderComponent= () => {
        switch (activeComponent){
            case 'general':
                return <AdmGeneral></AdmGeneral>;
            case 'certificaciones':
                return <AdmCertificaciones></AdmCertificaciones>;
            default:
                return <p>A ver.</p>
        }
    };

    return (
        <>
            <Box pb={120}>
                <header className={classes.header}>
                    <Group justify="space-between" h="100%">
                        <Text ta="center" c="cyan">Fernando Gonzalez</Text>
                        <Group h="100%" gap={0} visibleFrom="sm">
                            <a href="" className={classes.link} onClick={()=> setActiveComponent('general')}>
                                General
                            </a>
                            <a href="#" className={classes.link} onClick={()=> setActiveComponent('certificaciones')}>
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
                        <a href="#" className={classes.link}>
                            Learn
                        </a>
                        <a href="#" className={classes.link}>
                            Academy
                        </a>

                        <Divider my="sm" />

                        <Group justify="center" grow pb="xl" px="md">
                            <Button variant="default">Log in</Button>
                            <Button>Exit</Button>
                        </Group>
                    </ScrollArea>
                </Drawer>
            </Box>
            <Box>
                {renderComponent()}
            </Box>
        </>
    );
}