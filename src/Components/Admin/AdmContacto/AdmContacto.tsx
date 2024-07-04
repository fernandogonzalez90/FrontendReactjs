import { useState, useEffect } from 'react';
import { TextInput, SimpleGrid, Group, Title, Button, Container, Divider, Text, Modal, Table,Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';
import { Tabla } from '../Tabla/Tabla';
import { useApi } from '../../useApi';
import { ContactoType } from '../../../Types/apiTypes';

export function AdmCertificaciones() {
  const [editingItem, setEditingItem] = useState<ContactoType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDescriptionModalOpen, setIsDescriptionModalOpen] = useState(false);
  const [selectedDescription, setSelectedDescription] = useState('');

  const { fetch, post, put, del, data, response, error, loading, setData } = useApi<ContactoType[]>();

  const form = useForm({
    initialValues: {
      nombre: '',
      apellido: '',
      email: '',
      asunto: '',
      mensaje: '',
    },
  });

  useEffect(() => {
    fetch('contacto/');
  }, []);

  const handleSubmit = async (values: typeof form.values) => {
    try {
      if (editingItem) {
        const updatedItem = await put(`contacto/${editingItem.id}/`, values);
        setData(prevData => prevData ? prevData.map(item => item.id === editingItem.id ? updatedItem : item) : null);
      } else {
        const newItem = await post('contacto/', values);
        setData(prevData => prevData ? [...prevData, newItem] : [newItem]);
      }
      form.reset();
      setEditingItem(null);
      setIsModalOpen(false);
    } catch (err) {
      console.error('Error al enviar el formulario:', err);
    }
  };

  const handleEdit = (item: ContactoType) => {
    setEditingItem(item);
    form.setValues({
      nombre: item.nombre,
      apellido: item.apellido,
      email: item.email,
      asunto: item.asunto,
      mensaje: item.mensaje,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (item: ContactoType) => {
    try {
      await del(`contacto/${item.id}/`);
      setData(prevData => prevData ? prevData.filter(d => d.id !== item.id) : null);
    } catch (err) {
      console.error('Error al eliminar el item:', err);
    }
  };

  const renderDataRow = (row: ContactoType) => (
    <>
      <Table.Td>{row.id}</Table.Td>
      <Table.Td>{row.nombre}</Table.Td>
      <Table.Td>{row.apellido}</Table.Td>
      <Table.Td>{row.email}</Table.Td>
      <Table.Td>{row.asunto}</Table.Td>
      <Table.Td>
        <Button
          onClick={() => {
            setSelectedDescription(row.mensaje);
            setIsDescriptionModalOpen(true);
          }}
          size="xs"
        >
          Ver descripción
        </Button>
      </Table.Td>
    </>
  );

  const headers = ['id', 'nombre', 'apellidp', 'email', 'asunto', 'mensaje'];

  return (
    <Container size="lg" py="xl">
      <Divider my="md" color="cyan.3" />
      <Title order={2} ta="center" c="cyan" mt="sm" pt="lg">
        Mensajes
      </Title>

      <Tabla<ContactoType>
        data={data || []}
        renderRow={renderDataRow}
        headers={headers}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <Button onClick={() => setIsModalOpen(true)} variant="light" color="cyan" fullWidth mt="xl">
        Enviar Mensaje
      </Button>

      <Modal opened={isModalOpen} onClose={() => {
        setIsModalOpen(false);
        setEditingItem(null);
        form.reset();
      }} title={editingItem ? "Editar datos" : "Agregar datos"}>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <SimpleGrid cols={{ base: 1, sm: 2 }} mt="xl">
            <TextInput
              label="Nombre"
              {...form.getInputProps('titulo')}
              c="cyan"
            />
            <TextInput
              label="Apellido"
              {...form.getInputProps('categoria')}
              c="cyan"
            />
          </SimpleGrid>

          <TextInput
              label="email"
              {...form.getInputProps('email')}
              c="cyan"
            />
          <TextInput
              label="Asunto"
              {...form.getInputProps('asunto')}
              c="cyan"
            />
          <Textarea
            label="Mensaje"
            mt="md"
            {...form.getInputProps('mensaje')}
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
        title="Mensaje"
      >
        <Text>{selectedDescription}</Text>
      </Modal>
    </Container>
  );
}