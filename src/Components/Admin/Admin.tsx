import {
    Group,
    Button,
    UnstyledButton,
    Text,
    ThemeIcon,
    Divider,
    Center,
    Box,
    Burger,
    Drawer,
    Collapse,
    ScrollArea,
    rem,
    useMantineTheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
    IconNotification,
    IconCode,
    IconBook,
    IconChartPie3,
    IconFingerprint,
    IconCoin,
    IconChevronDown,
} from '@tabler/icons-react';
import classes from './Admin.module.css';
import { AdminGeneral } from './AdminGeneral/AdminGeneral';

const mockdata = [
    {
        icon: IconCode,
        title: 'Open source',
        description: 'This Pokémon’s cry is very loud and distracting',
    },
    {
        icon: IconCoin,
        title: 'Free for everyone',
        description: 'The fluid of Smeargle’s tail secretions changes',
    },
    {
        icon: IconBook,
        title: 'Documentation',
        description: 'Yanma is capable of seeing 360 degrees without',
    },
    {
        icon: IconFingerprint,
        title: 'Security',
        description: 'The shell’s rounded shape and the grooves on its.',
    },
    {
        icon: IconChartPie3,
        title: 'Analytics',
        description: 'This Pokémon uses its flying ability to quickly chase',
    },
    {
        icon: IconNotification,
        title: 'Notifications',
        description: 'Combusken battles with the intensely hot flames it spews',
    },
];

export function Admin() {
    const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
    const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
    const theme = useMantineTheme();

    const links = mockdata.map((item) => (
        <UnstyledButton className={classes.subLink} key={item.title}>
            <Group wrap="nowrap" align="flex-start">
                <ThemeIcon size={34} variant="default" radius="md">
                    <item.icon style={{ width: rem(22), height: rem(22) }} color={theme.colors.blue[6]} />
                </ThemeIcon>
                <div>
                    <Text size="sm" fw={500}>
                        {item.title}
                    </Text>
                    <Text size="xs" c="dimmed">
                        {item.description}
                    </Text>
                </div>
            </Group>
        </UnstyledButton>
    ));

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
                                <IconChevronDown
                                    style={{ width: rem(16), height: rem(16) }}
                                    color={theme.colors.blue[6]}
                                />
                            </Center>
                        </UnstyledButton>
                        <Collapse in={linksOpened}>{links}</Collapse>
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
            <AdminGeneral></AdminGeneral>
        </>
    );
}