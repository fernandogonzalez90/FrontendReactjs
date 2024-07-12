import { useState, useEffect } from 'react';
import { TextInput, SimpleGrid, Group, Title, Button, Container, Text, Modal, Table, ThemeIcon } from '@mantine/core';
import { useForm } from '@mantine/form';
import { Tabla } from '../Tabla/Tabla';
import { useApi } from '../../useApi';
import { SkillsType } from '../../../Types/apiTypes';
import { IoIosAddCircle } from 'react-icons/io';
import iconMap from '../../IconMap';

export function AdmSkills() {
  const [editingItem, setEditingItem] = useState<SkillsType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { fetch, post, put, del, data, response, error, loading, setData } = useApi<SkillsType[]>();

  const form = useForm({
    initialValues: {
      titulo: '',
      categoria: '',
      icon: '',
      color: '',
    },
  });

  useEffect(() => {
    fetch('skills/');
  }, []);

  const handleSubmit = async (values: typeof form.values) => {
    try {
      if (editingItem) {
        const updatedItem = await put(`skills/${editingItem.id}/`, values);
        setData(prevData => prevData ? prevData.map(item => item.id === editingItem.id ? updatedItem : item) : null);
      } else {
        const newItem = await post('skills/', values);
        setData(prevData => prevData ? [...prevData, newItem] : [newItem]);
      }
      form.reset();
      setEditingItem(null);
      setIsModalOpen(false);
    } catch (err) {
      console.error('Error al enviar el formulario:', err);
    }
  };

  const handleEdit = (item: SkillsType) => {
    setEditingItem(item);
    form.setValues({
      titulo: item.titulo,
      categoria: item.categoria,
      icon: item.icon,
      color: item.color,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (item: SkillsType) => {
    try {
      await del(`skills/${item.id}/`);
      setData(prevData => prevData ? prevData.filter(d => d.id !== item.id) : null);
    } catch (err) {
      console.error('Error al eliminar el item:', err);
    }
  };

  const renderDataRow = (row: SkillsType) => (
    <>
      <Table.Td>{row.id}</Table.Td>
      <Table.Td>{row.titulo}</Table.Td>
      <Table.Td>{row.categoria}</Table.Td>
      <Table.Td>
        <ThemeIcon variant="light" c='cyan'>
          {iconMap[row.icon]}
        </ThemeIcon>
      </Table.Td>
      <Table.Td><Text c={row.color} fw={700}>{row.color}</Text></Table.Td>
    </>
  );

  const headers = ['ID', 'Titulo', 'Categoria', 'Icon', 'Color'];

  return (
    <Container size="lg">
      <Group justify="space-between" align="center" mb="md">
        <Title order={2} c="cyan.3">
          Skills
        </Title>
        <Button onClick={() => setIsModalOpen(true)} variant="outline" color="cyan">
          <Text px="xs">Crear</Text> <IoIosAddCircle />
        </Button>
      </Group>

      <Tabla<SkillsType>
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
              label="Categoria"
              {...form.getInputProps('categoria')}
              c="cyan"
            />
          </SimpleGrid>
          <SimpleGrid cols={{ base: 1, sm: 2 }} mt="xl">
            <TextInput
              label="Icon"
              {...form.getInputProps('icon')}
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