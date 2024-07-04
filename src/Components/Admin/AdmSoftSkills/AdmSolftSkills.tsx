import { useState, useEffect } from 'react';
import { TextInput, SimpleGrid, Group, Title, Button, Container, Divider, Text, Modal, Table } from '@mantine/core';
import { useForm } from '@mantine/form';
import { Tabla } from '../Tabla/Tabla';
import { useApi } from '../../useApi';
import { SoftSkillsType } from '../../../Types/apiTypes';

export function AdmSoftSkills() {
  const [editingItem, setEditingItem] = useState<SoftSkillsType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { fetch, post, put, del, data, response, error, loading, setData } = useApi<SoftSkillsType[]>();

  const form = useForm({
    initialValues: {
      titulo: '',
      color: '',
    },
  });

  useEffect(() => {
    fetch('softskills/');
  }, []);

  const handleSubmit = async (values: typeof form.values) => {
    try {
      if (editingItem) {
        const updatedItem = await put(`softskills/${editingItem.id}/`, values);
        setData(prevData => prevData ? prevData.map(item => item.id === editingItem.id ? updatedItem : item) : null);
      } else {
        const newItem = await post('softskills/', values);
        setData(prevData => prevData ? [...prevData, newItem] : [newItem]);
      }
      form.reset();
      setEditingItem(null);
      setIsModalOpen(false);
    } catch (err) {
      console.error('Error al enviar el formulario:', err);
    }
  };

  const handleEdit = (item: SoftSkillsType) => {
    setEditingItem(item);
    form.setValues({
      titulo: item.titulo,
      color: item.color,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (item: SoftSkillsType) => {
    try {
      await del(`skills/${item.id}/`);
      setData(prevData => prevData ? prevData.filter(d => d.id !== item.id) : null);
    } catch (err) {
      console.error('Error al eliminar el item:', err);
    }
  };

  const renderDataRow = (row: SoftSkillsType) => (
    <>
      <Table.Td>{row.id}</Table.Td>
      <Table.Td>{row.titulo}</Table.Td>
      <Table.Td>{row.color}</Table.Td>
    </>
  );

  const headers = ['id', 'titulo', 'color'];

  return (
    <Container size="lg" py="xl">
      <Divider my="md" color="cyan.3" />
      <Title order={2} ta="center" c="cyan" mt="sm" pt="lg">
        Skills
      </Title>

      <Tabla<SoftSkillsType>
        data={data || []}
        renderRow={renderDataRow}
        headers={headers}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <Button onClick={() => setIsModalOpen(true)} variant="light" color="cyan" fullWidth mt="xl">
        Agregar Soft Skill
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
              label="Color"
              {...form.getInputProps('color')}
              c="cyan"
            />
          </SimpleGrid>

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