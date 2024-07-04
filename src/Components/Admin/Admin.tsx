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
import { useEffect, useState } from 'react';
import { AdmGeneral } from './AmdGeneral/AmdGeneral';
import {AdmPortafolio} from './AdmPortafolio/AdmPortafolio';
import {AdmSkills} from './AdmSkills/AdmSkills';
import {AdmContacto} from './AdmContacto/AdmContacto';



export function Admin() {
    const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
    const [activeComponent, setActiveComponent] = useState<string | null>(null);

    useEffect(() => {
        console.log('Estado activeComponent actualizado:', activeComponent);
    }, [activeComponent]);

    const renderComponent = () => {
        console.log('Renderizando componente:', activeComponent);
        switch (activeComponent) {
            case 'general':
                return <AdmGeneral></AdmGeneral>;
            case 'certificaciones':
                return <AdmCertificaciones></AdmCertificaciones>;
            case 'portafolio':
                return <AdmPortafolio></AdmPortafolio>;
            case 'skills':
                return <AdmSkills></AdmSkills>;
            case 'contacto':
                return <AdmContacto></AdmContacto>;
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
                            <a href="#" className={classes.link} onClick={() => setActiveComponent('')}>
                                Inicio
                            </a>
                            <a href="#" className={classes.link} onClick={() => setActiveComponent('general')}>
                                General
                            </a>
                            <a href="#" className={classes.link} onClick={() => setActiveComponent('certificaciones')}>
                                Certificaciones
                            </a>
                            <a href="#" className={classes.link} onClick={() => setActiveComponent('skills')}>
                                Skills
                            </a>
                            <a href="#" className={classes.link} onClick={() => setActiveComponent('portafolio')}>
                                Portafolio
                            </a>
                            <a href="#" className={classes.link} onClick={() => setActiveComponent('contacto')}>
                                Contacto
                            </a>
                        </Group>

                        <Group visibleFrom="sm">
                            <Button variant="light" color="cyan" radius="xs">Logout</Button>
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
                        <a href="#" className={classes.link} onClick={() => setActiveComponent('')}>
                            Inicio
                        </a>

                        <a href="#" className={classes.link} onClick={() => setActiveComponent('general')}>
                            General
                        </a>
                        <a href="#" className={classes.link} onClick={() => setActiveComponent('certificaciones')}>
                            Certificaciones
                        </a>
                        <a href="#" className={classes.link} onClick={() => setActiveComponent('skills')}>
                            Skills
                        </a>
                        <a href="#" className={classes.link} onClick={() => setActiveComponent('portafolio')}>
                            Portafolio
                        </a>
                        <a href="#" className={classes.link} onClick={() => setActiveComponent('contacto')}>
                            Contacto
                        </a>

                        <Divider my="sm" />

                        <Group justify="center" grow pb="xl" px="md">
                            <Button>Exit</Button>
                        </Group>
                    </ScrollArea>
                </Drawer>
            </Box>
            <Box mt={20}>
                {renderComponent()}
            </Box>
        </>
    );
}