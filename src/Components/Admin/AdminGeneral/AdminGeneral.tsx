import { TextInput, Textarea, SimpleGrid, Group, Title, Button, Container, Divider, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { usePost } from '../../usePost';


export function AdminGeneral() {
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
        // validate: {
        //     nombre: (value) => value.trim().length < 2 ? 'Nombre demasiado corto' : null,
        //     apellido: (value) => value.trim().length < 2 ? 'Apellido demasiado corto' : null,
        //     email: (value) => !/^\S+@\S+$/.test(value) ? 'Correo inválido' : null,
        //     asunto: (value) => value.trim().length === 0 ? 'El asunto no puede estar vacío' : null,
        //     //   telefono: (value) => !/^\d{10}$/.test(value) ? 'Teléfono inválido' : null,
        //     mensaje: (value) => value.trim().length === 0 ? 'El mensaje no puede estar vacío' : null,
        // },
    });

    const { post, response, error, loading } = usePost();

    const handleSubmit = async (values: typeof form.values) => {
        console.log('Submitting form with values:', values);
        await post('certificaciones/', values);
        console.log('Response:', response);
    };

    return (
        <Container size="lg" py="xl" id='contacto'>
            <Divider my="md" color="cyan.3" />
            <Container size="xs">
                <form onSubmit={form.onSubmit(handleSubmit)}>
                    <Title order={2} ta="center" c="cyan" mt="sm" pt="lg">
                        Contactame
                    </Title>

                    <SimpleGrid cols={{ base: 1, sm: 2 }} mt="xl">
                        <TextInput
                            label="Titulo"
                            name="titulo"
                            {...form.getInputProps('titulo')}
                            c="cyan"
                        />
                        <TextInput
                            label="Institucion"
                            name="institucion"
                            {...form.getInputProps('institucion')}
                            c="cyan"
                        />
                    </SimpleGrid>

                    <TextInput
                        label="Descripcion"
                        name="descripcion"
                        {...form.getInputProps('descripcion')}
                        c="cyan"
                    />

                    <TextInput
                        label="Año"
                        mt="md"
                        name="anio"
                        {...form.getInputProps('anio')}
                        c="cyan"
                    />

                    <TextInput
                        label="Categoria"
                        mt="md"
                        name="categoria"
                        {...form.getInputProps('categoria')}
                        c="cyan"
                    />

                    <TextInput
                        label="Certificado"
                        mt="md"
                        name="certificado"
                        {...form.getInputProps('certificado')}
                        c="cyan"
                    />

                    <TextInput
                        label="Icon"
                        mt="md"
                        name="icon"
                        {...form.getInputProps('icon')}
                        c="cyan"
                    />

                    <Group justify="center" mt="xl">
                        <Button variant="light" color="cyan" fullWidth type="submit" disabled={loading}>
                            {loading ? 'Enviando...' : 'Enviar'}
                        </Button>
                    </Group>
                </form>
                {response && <Text c="teal.4" ta="center" py="xs">Mensaje enviado correctamente.</Text>}
                {error &&
                    <Text c="red.4" ta="center" py="xs">Error al enviar el mensaje: {error}</Text>}
            </Container>
        </Container>
    );
}
