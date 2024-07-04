import { useState, useEffect } from 'react';
import { TextInput, SimpleGrid, Group, Title, Button, Container, Divider, Text, Modal, Table } from '@mantine/core';
import { useForm } from '@mantine/form';
import { Tabla } from '../Tabla/Tabla';
import { useApi } from '../../useApi';
import { CertificacionesType } from '../../../Types/apiTypes';

export function AdmCertificaciones() {
    const [editingItem, setEditingItem] = useState<CertificacionesType | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { fetch, post, put, del, data, response, error, loading, setData } = useApi<CertificacionesType[]>();

    const form = useForm({
        initialValues: {
            titulo: '',
            institucion: '',
            descripcion: '',
            anio: '',
            categoria: '',
            certificado: '',
            icon: ''
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
        form.setValues(item);
        setIsModalOpen(true);
    };

    const handleDelete = async (item: CertificacionesType) => {
        try {
            await del(`certificaciones/${item.id}/`);
            setData(prevData => prevData ? prevData.filter(d => d.id !== item.id) : null);
        } catch (err) {
            console.error('Error al eliminar el item:', err);
        }
    };

    const renderDataRow = (row: CertificacionesType) => (
        <>
            <Table.Td>{row.id}</Table.Td>
            <Table.Td>{row.titulo}</Table.Td>
            <Table.Td>{row.institucion}</Table.Td>
            <Table.Td>{row.descripcion}</Table.Td>
            <Table.Td>{row.anio}</Table.Td>
            <Table.Td>{row.categoria}</Table.Td>
            <Table.Td>{row.certificado}</Table.Td>
            <Table.Td>{row.icon}</Table.Td>
        </>
    );

    const headers = ['id', 'titulo', 'institucion', 'descripcion', 'año', 'categoria', 'certificado', 'icon'];

    return (
        <Container size="lg" py="xl">
            <Divider my="md" color="cyan.3" />
            <Title order={2} ta="center" c="cyan" mt="sm" pt="lg">
                Certificaciones
            </Title>

            <Tabla<CertificacionesType>
                data={data || []}
                renderRow={renderDataRow}
                headers={headers}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            <Button onClick={() => setIsModalOpen(true)} variant="light" color="cyan" fullWidth mt="xl">
                Agregar nueva certificación
            </Button>

            <Modal opened={isModalOpen} onClose={() => {
                setIsModalOpen(false);
                setEditingItem(null);
                form.reset();
            }} title={editingItem ? "Editar Certificación" : "Agregar Certificación"}>
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

                    <TextInput
                        label="Descripcion"
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
        </Container>
    );
}