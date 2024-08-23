import { useState, useEffect } from 'react';
import { TextInput, SimpleGrid, Group, Title, Button, Container, Text, Modal, Table, Textarea, Anchor, ThemeIcon } from '@mantine/core';
import { useForm } from '@mantine/form';
import { Tabla } from '../Tabla/Tabla';
import { useApi } from '../../useApi';
import { CertificacionesType } from '../../../Types/apiTypes';
import { IoIosAddCircle } from "react-icons/io";
import iconMap from '../../IconMap';


export function AdmCertificaciones() {
    const [editingItem, setEditingItem] = useState<CertificacionesType | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDescriptionModalOpen, setIsDescriptionModalOpen] = useState(false);
    const [selectedDescription, setSelectedDescription] = useState('');

    const { fetch, post, put, del, data, response, error, loading, setData } = useApi<CertificacionesType[]>();

    const form = useForm({
        initialValues: {
            titulo: '',
            institucion: '',
            descripcion: '',
            anio: '',
            categoria: '',
            certificado: '',
            icon: '',
        },
    });

    useEffect(() => {
        fetch('certificaciones/');
    }, []);

    const handleSubmit = async (values: typeof form.values) => {
        try {
            if (editingItem) {
                const updatedItem = await put(`certificaciones/${editingItem.id}/`, values);
                setData(prevData => prevData ? prevData.map(item => item.id === editingItem.id ? updatedItem : item) : null);
            } else {
                const newItem = await post('certificaciones/', values);
                setData(prevData => prevData ? [...prevData, newItem] : [newItem]);
            }
            form.reset();
            setEditingItem(null);
            setIsModalOpen(false);
        } catch (err) {
            console.error('Error al enviar el formulario:', err);
        }
    };

    const handleEdit = (item: CertificacionesType) => {
        setEditingItem(item);
        form.setValues({
            titulo: item.titulo,
            institucion: item.institucion,
            descripcion: item.descripcion,
            anio: item.anio,
            categoria: item.categoria,
            certificado: item.certificado,
            icon: item.icon,
        });
        setIsModalOpen(true);
    };

    const handleDelete = async (item: CertificacionesType) => {
        try {
            await del(`certificado/${item.id}/`);
            setData(prevData => prevData ? prevData.filter(d => d.id !== item.id) : null);
        } catch (err) {
            console.error('Error al eliminar el item:', err);
        }
    };

    const renderDataRow = (row: CertificacionesType) => (
        <>
            <Table.Td>{row.id}</Table.Td>
            <Table.Td>
                <ThemeIcon variant="light" c='cyan'>
                    {iconMap[row.icon]}
                </ThemeIcon>
            </Table.Td>
            <Table.Td>{row.titulo}</Table.Td>
            <Table.Td>{row.institucion}</Table.Td>
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
            <Table.Td>{row.anio}</Table.Td>
            <Table.Td>{row.categoria}</Table.Td>
            <Table.Td>
                <Anchor href={row.certificado} target="_blank" underline="hover">
                    Ver Certificado
                </Anchor>
            </Table.Td>
        </>
    );

    const headers = ['ID', 'Icon', 'Titulo', 'Institucion', 'Descripción', 'Año', 'Categoria', 'Certificado'];

    return (
        <Container size="lg">
            <Group justify="space-between" align="center" mb="md">
                <Title order={2} c="cyan.3">
                    Certificaciones
                </Title>
                <Button onClick={() => setIsModalOpen(true)} variant="outline" color="cyan">
                    <Text px="xs">Crear</Text> <IoIosAddCircle />
                </Button>
            </Group>

            <Tabla<CertificacionesType>
                data={data || []}
                renderRow={renderDataRow}
                headers={headers}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            <Modal centered opened={isModalOpen} onClose={() => {
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
                            label="Institucion"
                            {...form.getInputProps('institucion')}
                            c="cyan"
                        />
                    </SimpleGrid>

                    <Textarea
                        label="Descripcion"
                        mt="md"
                        resize="vertical"
                        {...form.getInputProps('descripcion')}
                        c="cyan"
                    />

                    <TextInput
                        label="Año"
                        mt="md"
                        {...form.getInputProps('anio')}
                        c="cyan"
                    />

                    <TextInput
                        label="Categoria"
                        mt="md"
                        {...form.getInputProps('categoria')}
                        c="cyan"
                    />

                    <TextInput
                        label="Certificado"
                        mt="md"
                        {...form.getInputProps('certificado')}
                        c="cyan"
                    />

                    <TextInput
                        label="Icon"
                        mt="md"
                        {...form.getInputProps('icon')}
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
                centered
                opened={isDescriptionModalOpen}
                onClose={() => setIsDescriptionModalOpen(false)}
                title="Descripción"
            >
                <Text>{selectedDescription}</Text>
            </Modal>
        </Container>
    );
}