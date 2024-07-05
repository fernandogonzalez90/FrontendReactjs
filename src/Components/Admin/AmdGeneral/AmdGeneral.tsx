import { useState, useEffect } from 'react';
import { TextInput, SimpleGrid, Group, Title, Button, Container, Text, Modal, Table, FileInput, Anchor } from '@mantine/core';
import { useForm } from '@mantine/form';
import { Tabla } from '../Tabla/Tabla';
import { useApi } from '../../useApi';
import { GeneralType } from '../../../Types/apiTypes';
import { IoIosAddCircle } from 'react-icons/io';

export function AdmGeneral() {
    const [editingItem, setEditingItem] = useState<GeneralType | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDescriptionModalOpen, setIsDescriptionModalOpen] = useState(false);
    const [selectedDescription, setSelectedDescription] = useState('');

    const { get, post, put, del, fetch, data, response, error, loading, setData } = useApi<GeneralType[]>({
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    const form = useForm({
        initialValues: {
            titulo: '',
            subtitulo: '',
            descripcion: '',
            imagen: null as File | null,
            github: '',
            linkedin: '',
            email: '',
            curriculum: ''
        },
    });

    useEffect(() => {
        return () => {
            data?.forEach(item => {
                if (item.imagen instanceof File) {
                    URL.revokeObjectURL(URL.createObjectURL(item.imagen));
                }
            });
        };
    }, [data]);

    useEffect(() => {
        fetch('general/');
    }, []);

    const handleSubmit = async (values: typeof form.values) => {
        try {
            const formData = new FormData();
            (Object.keys(values) as Array<keyof typeof values>).forEach(key => {
                if (key === 'imagen' && values[key] instanceof File) {
                    formData.append(key, values[key] as File);
                } else if (values[key] !== null) {
                    formData.append(key, values[key] as string);
                }
            });

            if (editingItem) {
                const updatedItem = await put(`general/${editingItem.id}/`, formData);
                setData(prevData => prevData ? prevData.map(item => item.id === editingItem.id ? updatedItem : item) : null);
            } else {
                const newItem = await post('general/', formData);
                setData(prevData => prevData ? [...prevData, newItem] : [newItem]);
            }
            form.reset();
            setEditingItem(null);
            setIsModalOpen(false);
        } catch (err) {
            console.error('Error al enviar el formulario:', err);
        }
    };

    const handleEdit = async (item: GeneralType) => {
        setEditingItem(item);
        form.setValues({
            titulo: item.titulo,
            subtitulo: item.subtitulo,
            descripcion: item.descripcion,
            imagen: null,
            github: item.github,
            linkedin: item.linkedin,
            email: item.email,
            curriculum: item.curriculum
        });

        if (typeof item.imagen === 'string' && item.imagen) {
            try {
                const response = await get(item.imagen, { responseType: 'blob' });
                if (response instanceof Blob) {
                    const file = new File([response], "image.jpg", { type: response.type });
                    form.setFieldValue('imagen', file);
                } else {
                    console.error('La respuesta no es un Blob');
                }
            } catch (error) {
                console.error('Error al cargar la imagen:', error);
            }
        } else if (item.imagen instanceof File) {
            form.setFieldValue('imagen', item.imagen);
        }

        setIsModalOpen(true);
    };

    const handleDelete = async (item: GeneralType) => {
        try {
            await del(`general/${item.id}/`);
            setData(prevData => prevData ? prevData.filter(d => d.id !== item.id) : null);
        } catch (err) {
            console.error('Error al eliminar el item:', err);
        }
    };

    const renderDataRow = (row: GeneralType) => (
        <>
            <Table.Td>{row.id}</Table.Td>
            <Table.Td>
                {row.imagen ? (
                    <img
                        src={typeof row.imagen === 'string' ? row.imagen : URL.createObjectURL(row.imagen)}
                        alt="Imagen"
                        style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                    />
                ) : (
                    'Sin imagen'
                )}
            </Table.Td>
            <Table.Td>{row.titulo}</Table.Td>
            <Table.Td>{row.subtitulo}</Table.Td>
            <Table.Td>
                <Button
                    onClick={() => {
                        setSelectedDescription(row.descripcion);
                        setIsDescriptionModalOpen(true);
                    }}
                    size="xs"
                    variant='light'
                    color='cyan'
                >
                    Ver Descripción
                </Button>
            </Table.Td>
            <Table.Td>
                <Anchor href={row.github} target="_blank" underline='hover'>
                    GitHub
                </Anchor>
            </Table.Td>
            <Table.Td>
                <Anchor href={row.linkedin} target="_blank" underline='hover'>
                    LinkedIn
                </Anchor>
            </Table.Td>
            <Table.Td>
                {row.email}
            </Table.Td>
            <Table.Td>
                <Anchor href={row.curriculum} target="_blank" underline='hover'>
                    CV
                </Anchor>
            </Table.Td>
        </>
    );

    const headers = ['ID', 'Imagen', 'Titulo', 'Subtitulo', 'Descripción', 'Github', 'Linkedin', 'Email', 'CV'];

    return (
        <Container size="lg">
            <Group justify="space-between" align="center" mb="md">
                <Title order={2} c="cyan.3">
                    General
                </Title>
                <Button onClick={() => setIsModalOpen(true)} variant="outline" color="cyan">
                    <Text px="xs">Crear</Text> <IoIosAddCircle />
                </Button>
            </Group>

            <Tabla<GeneralType>
                data={data || []}
                renderRow={renderDataRow}
                headers={headers}
                onEdit={handleEdit}
                onDelete={handleDelete}

            />

            <Modal opened={isModalOpen} onClose={() => {
                setIsModalOpen(false);
                setEditingItem(null);
                form.reset();
            }} title={editingItem ? "Editar datos" : "Agregar datos"}>
                <form onSubmit={form.onSubmit(handleSubmit)}>
                    <SimpleGrid cols={{ base: 1, sm: 2 }} mt="xl">
                        <TextInput
                            label="Titulo"
                            {...form.getInputProps('titulo')}
                            c="cyan"
                        />
                        <TextInput
                            label="Subtitulo"
                            {...form.getInputProps('subtitulo')}
                            c="cyan"
                        />
                    </SimpleGrid>

                    <TextInput
                        label="Descripcion"
                        mt="md"
                        {...form.getInputProps('descripcion')}
                        c="cyan"
                    />

                    <FileInput
                        radius="xs"
                        label="Imagen"
                        withAsterisk
                        placeholder="Imagen"
                        accept="image/*"
                        {...form.getInputProps('imagen')}
                    />

                    <TextInput
                        label="Github"
                        mt="md"
                        {...form.getInputProps('github')}
                        c="cyan"
                    />

                    <TextInput
                        label="Linkedin"
                        mt="md"
                        {...form.getInputProps('linkedin')}
                        c="cyan"
                    />

                    <TextInput
                        label="Email"
                        mt="md"
                        {...form.getInputProps('email')}
                        c="cyan"
                    />

                    <TextInput
                        label="Curriculum"
                        mt="md"
                        {...form.getInputProps('curriculum')}
                        c="cyan"
                    />
                    <Group justify="center" mt="xl">
                        <Button variant="light" color="cyan" fullWidth type="submit" disabled={loading}>
                            {loading ? 'Enviando...' : editingItem ? 'Actualizar' : 'Agregar'}
                        </Button>
                    </Group>
                </form>
                {response && <Text c="teal.4" ta="center" py="xs">Operación realizada con éxito.</Text>}
                {error && <Text c="red.4" ta="center" py="xs">Error: {error}</Text>}
            </Modal>
            <Modal
                opened={isDescriptionModalOpen}
                onClose={() => setIsDescriptionModalOpen(false)}
                title="Descripción"
            >
                <Text>{selectedDescription}</Text>
            </Modal>
        </Container>
    );
}