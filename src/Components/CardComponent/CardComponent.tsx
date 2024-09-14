import { ActionIcon, Anchor, Button, Card, Center, Dialog, Group, Menu, Text, ThemeIcon, rem, CloseButton } from '@mantine/core'
import { CardComponentProps } from '../../Types/apiTypes'
import iconMap from '../IconMap'
import { PiCertificate } from 'react-icons/pi'
import { HiOutlineDotsVertical } from 'react-icons/hi'
import { CiCirclePlus } from 'react-icons/ci'
import { FaFolderClosed } from "react-icons/fa6";
import { FaEye, FaGithub } from 'react-icons/fa'
import { useState } from 'react'

const CardComponent: React.FC<CardComponentProps> = ({ datos }) => {
    const [isDescriptionDialogOpen, setIsDescriptionDialogOpen] = useState(false);
    const [selectedDescription, setSelectedDescription] = useState<string[]>([]);
    const iconosArray = datos.iconos ? datos.iconos.split(',') : [];

    const openDescriptionDialog = (description: string) => {
        const descriptionItems = description.split('|').filter(item => item.trim() !== '');
        setSelectedDescription(descriptionItems);
        setIsDescriptionDialogOpen(true);
    };

    return (
        <Card withBorder shadow="sm" radius="md" key={datos.id}>
            <Card.Section withBorder inheritPadding py="xs">
                <Group justify="space-between">

                    {/* Icono Izquierdo */}
                    <ActionIcon variant="transparent" aria-label={datos.titulo} size="lg" color="cyan">
                        {datos.icon ? iconMap[datos.icon] : <FaFolderClosed />}
                    </ActionIcon>

                    {/* Titulo */}
                    <Text size="lg" c="cyan">{datos.titulo}</Text>

                    {/* Icono Derecho */}
                    <Menu withinPortal position="bottom-end" shadow="sm">
                        {datos.certificado &&
                            <Anchor href={datos.certificado} target="_blank" underline="never">
                                <ActionIcon variant="transparent" aria-label="Settings" size="lg">
                                    <PiCertificate color="cyan" style={{ width: '70%', height: '70%' }} />
                                </ActionIcon>
                            </Anchor>}

                        {datos.tipo &&
                            <>
                                <Menu.Target>
                                    <ActionIcon variant="transparent">
                                        <HiOutlineDotsVertical color="cyan" style={{ width: rem(16), height: rem(16) }} />
                                    </ActionIcon>
                                </Menu.Target>
                                <Menu.Dropdown>
                                    {datos.descripcion &&
                                        <Menu.Item leftSection={<CiCirclePlus color="cyan" style={{ width: rem(14), height: rem(14) }} />}>
                                            <Anchor target="_blank" underline="never" onClick={() => {
                                                if (datos.descripcion) {
                                                    openDescriptionDialog(datos.descripcion);
                                                }
                                            }}>
                                                <Text c="cyan">Ver Mas</Text>
                                            </Anchor>
                                        </Menu.Item>
                                    }

                                    {datos.view_live &&
                                        <Menu.Item leftSection={<FaEye color="cyan" style={{ width: rem(14), height: rem(14) }} />}>

                                            <Anchor href={datos.view_live} target="_blank" underline="never">
                                                <Text c="cyan">Ver Online</Text>
                                            </Anchor>
                                        </Menu.Item>
                                    }
                                    {datos.repositorio &&
                                        <Menu.Item leftSection={<FaGithub color="cyan" style={{ width: rem(14), height: rem(14) }} />}>
                                            <Anchor href={datos.repositorio} target="_blank" underline="never">
                                                <Text c="cyan">Repositorio</Text>
                                            </Anchor>
                                        </Menu.Item>
                                    }
                                </Menu.Dropdown>
                            </>}
                    </Menu>
                </Group>
            </Card.Section>

            {/* Datos Proyectos */}
            {datos.categoria &&
                <Text mt="sm" c="dimmed" size="sm" ta="center">
                    <Text fw={700} span inherit c="cyan">
                        Categoria:
                    </Text>{' '}
                    {datos.categoria}
                    <br />
                </Text>}

            {datos.tipo &&
                <Text mt="sm" c="dimmed" size="sm" ta="center" py={4}>
                    <Text fw={700} span inherit c="cyan">
                        Tipo:
                    </Text>{' '}
                    {datos.tipo}
                </Text>}

            {datos.certificado &&
                <Text mt="sm" c="dimmed" size="sm" ta="center" py={4}>
                    <Text fw={700} span inherit c="cyan">
                        Institucion:
                    </Text>{' '}
                    {datos.institucion} | {datos.anio}
                    <br />
                </Text>}
            <br />
            <Card.Section withBorder inheritPadding py="xs" >
                {datos.anio &&
                    <Button fullWidth variant='light' onClick={() => {
                        if (datos.descripcion) {
                            openDescriptionDialog(datos.descripcion);
                        }
                    }}> Temas Aprendidos</Button>
                }

                <Center>
                    <Group align='center'>
                        {iconosArray.map((icon, index) => (
                            <ThemeIcon key={index} variant="transparent" color="cyan">
                                {iconMap[icon.trim()]}
                            </ThemeIcon>
                        ))}
                    </Group>
                </Center>
            </Card.Section>
            <Dialog
                opened={isDescriptionDialogOpen}
                onClose={() => setIsDescriptionDialogOpen(false)}
                withCloseButton={false}
                style={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    maxWidth: '90vw',
                    maxHeight: '90vh',
                    padding: '1rem',
                    overflowY: 'auto',
                    backgroundColor: 'white',
                    borderRadius: '10px',
                    boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.1)'
                }}
            >
                <Group justify="flex-end">
                    <CloseButton onClick={() => setIsDescriptionDialogOpen(false)} />
                </Group>
                <ul>
                    {selectedDescription.map((item, index) => (
                        <li key={index}>{item.trim()}</li>
                    ))}
                </ul>
            </Dialog>
        </Card>
    )
}

export default CardComponent;
