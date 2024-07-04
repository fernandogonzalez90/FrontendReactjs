import { useState, useEffect } from 'react';
import { TextInput, SimpleGrid, Group, Title, Button, Container, Divider, Text, Modal, Table, Anchor, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';
import { Tabla } from '../Tabla/Tabla';
import { useApi } from '../../useApi';
import { ProyectosType } from '../../../Types/apiTypes';

export function AdmPortafolio() {
  const [editingItem, setEditingItem] = useState<ProyectosType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDescriptionModalOpen, setIsDescriptionModalOpen] = useState(false);
  const [selectedDescription, setSelectedDescription] = useState('');

  const { fetch, post, put, del, data, response, error, loading, setData } = useApi<ProyectosType[]>();

  const form = useForm({
    initialValues: {
      titulo: '',
      categoria: '',
      descripcion: '',
      repositorio: '',
      view_live: '',
      iconos: '',
    },
  });

  useEffect(() => {
    fetch('proyectos/');
  }, []);

  const handleSubmit = async (values: typeof form.values) => {
    try {
      if (editingItem) {
        const updatedItem = await put(`proyectos/${editingItem.id}/`, values);
        setData(prevData => prevData ? prevData.map(item => item.id === editingItem.id ? updatedItem : item) : null);
      } else {
        const newItem = await post('proyectos/', values);
        setData(prevData => prevData ? [...prevData, newItem] : [newItem]);
      }
      form.reset();
      setEditingItem(null);
      setIsModalOpen(false);
    } catch (err) {
      console.error('Error al enviar el formulario:', err);
    }
  };

  const handleEdit = (item: ProyectosType) => {
    setEditingItem(item);
    form.setValues({
      titulo: item.titulo,
      categoria: item.categoria,
      descripcion: item.descripcion,
      repositorio: item.repositorio,
      iconos: item.iconos,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (item: ProyectosType) => {
    try {
      await del(`certificado/${item.id}/`);
      setData(prevData => prevData ? prevData.filter(d => d.id !== item.id) : null);
    } catch (err) {
      console.error('Error al eliminar el item:', err);
    }
  };

  const renderDataRow = (row: ProyectosType) => (
    <>
      <Table.Td>{row.id}</Table.Td>
      <Table.Td>{row.iconos}</Table.Td>
      <Table.Td>{row.titulo}</Table.Td>
      <Table.Td>{row.categoria}</Table.Td>
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
      <Table.Td>
        <Anchor href={row.repositorio} target="_blank">
          Repositorio
        </Anchor>
      </Table.Td>
      <Table.Td>
        <Anchor href={row.view_live} target="_blank">
          Ver Online
        </Anchor>
      </Table.Td>
    </>
  );

  const headers = ['id', 'iconos', 'titulo', 'categoria', 'descripción', 'repositorio', 'ver live'];

  return (
    <Container size="lg" py="xl">
      <Divider my="md" color="cyan.3" />
      <Title order={2} ta="center" c="cyan" mt="sm" pt="lg">
        Portafolio
      </Title>

      <Tabla<ProyectosType>
        data={data || []}
        renderRow={renderDataRow}
        headers={headers}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <Button onClick={() => setIsModalOpen(true)} variant="light" color="cyan" fullWidth mt="xl">
        Agregar Proyecto
      </Button>

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
              label="Categoria"
              {...form.getInputProps('categoria')}
              c="cyan"
            />
          </SimpleGrid>

          <Textarea
            label="Descripcion"
            mt="md"
            {...form.getInputProps('descripcion')}
            c="cyan"
          />

          <TextInput
            label="Repositorio"
            mt="md"
            {...form.getInputProps('repositorio')}
            c="cyan"
          />

          <TextInput
            label="View Live"
            mt="md"
            {...form.getInputProps('view_live')}
            c="cyan"
          />

          <TextInput
            label="Iconos"
            mt="md"
            {...form.getInputProps('iconos')}
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