import { useState, useEffect } from 'react';
import { TextInput, SimpleGrid, Group, Title, Button, Container, Text, Modal, Table, FileInput } from '@p0?: { headers: { 'Content - Type': string; }; }p0: { headers: { 'Content - Type': string; }; }p0: { headers: { 'Content - Type': string; }; }mantine/core';
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

    const { fetch, post, put, del, data, response, error, loading, setData } = useApi<GeneralType[]>({
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

    const handleEdit = (item: GeneralType) => {
        setEditingItem(item);
        form.setValues({
            titulo: item.titulo,
            subtitulo: item.subtitulo,
            descripcion: item.descripcion,
            imagen: item.imagen || null, // Convertir a null si es una cadena vacía
            github: item.github,
            linkedin: item.linkedin,
            email: item.email,
            curriculum: item.curriculum
        });
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
            <Table.Td>{row.titulo}</Table.Td>
            <Table.Td>{row.subtitulo}</Table.Td>
            <Table.Td>
                <Button
                    onClick={() => {
                        setSelectedDescription(row.descripcion);
                        setIsDescriptionModalOpen(true);
                    }}
                    size="xs"
                >
                    Ver descripción
                </Button>
            </Table.Td>
            <Table.Td>{row.imagen}</Table.Td>
            <Table.Td>{row.github}</Table.Td>
            <Table.Td>{row.linkedin}</Table.Td>
            <Table.Td>{row.email}</Table.Td>
            <Table.Td>{row.curriculum}</Table.Td>
        </>
    );

    const headers = ['ID', 'Titulo', 'Subtitulo', 'Descripción', 'Imagen', 'Github', 'Linkedin', 'Email', 'CV'];

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