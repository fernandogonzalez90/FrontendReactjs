import { ActionIcon, Anchor, Button, Card, Center, Group, Menu, Modal, Text, ThemeIcon, rem } from '@mantine/core'
import { CardComponentProps } from '../../Types/apiTypes'
import iconMap from '../IconMap'
import { PiCertificate } from 'react-icons/pi'
import { HiOutlineDotsVertical } from 'react-icons/hi'
import { CiCirclePlus } from 'react-icons/ci'
import { FaFolderClosed } from "react-icons/fa6";
import { FaEye, FaGithub } from 'react-icons/fa'
import { useState } from 'react'

const CardComponent: React.FC<CardComponentProps> = ({ datos }) => {
    const [isDescriptionModalOpen, setIsDescriptionModalOpen] = useState(false);
    const [selectedDescription, setSelectedDescription] = useState<string[]>([]);
    const iconosArray = datos.iconos ? datos.iconos.split(',') : [];

    const openDescriptionModal = (description: string) => {
        const descriptionItems = description.split('.').filter(item => item.trim() !== '');
        setSelectedDescription(descriptionItems);
        setIsDescriptionModalOpen(true);
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

                        {datos.repositorio &&
                            <><Menu.Target>
                                <ActionIcon variant="transparent">
                                    <HiOutlineDotsVertical color="cyan" style={{ width: rem(16), height: rem(16) }} />
                                </ActionIcon>
                            </Menu.Target>
                                <Menu.Dropdown>
                                    <Menu.Item leftSection={<CiCirclePlus color="cyan" style={{ width: rem(14), height: rem(14) }} />}>
                                        <Anchor target="_blank" underline="never" onClick={() => {
                                            if (datos.descripcion) {
                                                openDescriptionModal(datos.descripcion);
                                            }
                                        }}>
                                            <Text c="cyan">Ver Mas</Text>
                                        </Anchor>
                                    </Menu.Item>
                                    <Menu.Item leftSection={<FaEye color="cyan" style={{ width: rem(14), height: rem(14) }} />}>
                                        {datos.repositorio.length > 2 &&
                                            <Anchor href={datos.view_live} target="_blank" underline="never">
                                                <Text c="cyan">Ver Online</Text>
                                            </Anchor>}
                                    </Menu.Item>
                                    <Menu.Item leftSection={<FaGithub color="cyan" style={{ width: rem(14), height: rem(14) }} />}>
                                        <Anchor href={datos.repositorio} target="_blank" underline="never">
                                            <Text c="cyan">Repositorio</Text>
                                        </Anchor>
                                    </Menu.Item>
                                </Menu.Dropdown></>}
                    </Menu>
                </Group>
            </Card.Section>
            {/* Datos Proyectos */}
            {datos.repositorio &&
                <Text mt="sm" c="dimmed" size="sm" ta="center">
                    <Text fw={700} span inherit c="cyan">
                        Categoria:
                    </Text>{' '}
                    {datos.categoria}
                </Text>}

            {/* Datos Certificados */}
            {datos.certificado &&
                <Text mt="sm" c="dimmed" size="sm" ta="center">
                    <Text fw={700} span inherit c="cyan">
                        Institucion:
                    </Text>{' '}
                    {datos.institucion} | {datos.anio}
                </Text>}
            <br />
            <Card.Section withBorder inheritPadding py="xs" >
                {datos.anio &&
                    <Button fullWidth variant='light' onClick={() => {
                        if (datos.descripcion) {
                            openDescriptionModal(datos.descripcion);
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
            <Modal
                opened={isDescriptionModalOpen}
                onClose={() => setIsDescriptionModalOpen(false)}
                title="Descripción"
            >
                <ul>
                    {selectedDescription.map((item, index) => (
                        <li key={index}>{item.trim()}</li>
                    ))}
                </ul>
            </Modal>
        </Card>
    )
}

export default CardComponent