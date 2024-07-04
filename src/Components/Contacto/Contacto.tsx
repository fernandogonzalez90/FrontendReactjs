import { TextInput, Textarea, SimpleGrid, Group, Title, Button, Container, Divider, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useApi } from '../useApi';


export function Contacto() {
    const form = useForm({
        initialValues: {
            nombre: '',
            apellido: '',
            asunto: '',
            email: '',
            mensaje: '',
        },
        validate: {
            nombre: (value) => value.trim().length < 2 ? 'Nombre demasiado corto' : null,
            apellido: (value) => value.trim().length < 2 ? 'Apellido demasiado corto' : null,
            email: (value) => !/^\S+@\S+$/.test(value) ? 'Correo inválido' : null,
            asunto: (value) => value.trim().length === 0 ? 'El asunto no puede estar vacío' : null,
            //   telefono: (value) => !/^\d{10}$/.test(value) ? 'Teléfono inválido' : null,
            mensaje: (value) => value.trim().length === 0 ? 'El mensaje no puede estar vacío' : null,
        },
    });

    const { post, response, error, loading } = useApi();

    const handleSubmit = async (values: typeof form.values) => {
        console.log('Submitting form with values:', values);
        await post('contacto/', values);
        console.log('Response:', response);
    };

    return (
        <Container size="lg" py="xl" id='contacto'>
            <Divider my="md" color="cyan.3"/>
            <Container size="xs">
                <form onSubmit={form.onSubmit(handleSubmit)}>
                    <Title order={2} ta="center" c="cyan" mt="sm" pt="lg">
                        Contactame
                    </Title>

                    <SimpleGrid cols={{ base: 1, sm: 2 }} mt="xl">
                        <TextInput
                            label="Nombre"
                            name="nombre"
                            {...form.getInputProps('nombre')}
                            c="cyan"
                        />
                        <TextInput
                            label="Apellido"
                            name="apellido"
                            {...form.getInputProps('apellido')}
                            c="cyan"
                        />
                    </SimpleGrid>

                    <TextInput
                        label="Email"
                        name="email"
                        {...form.getInputProps('email')}
                        c="cyan"
                    />

                    <TextInput
                        label="Asunto"
                        mt="md"
                        name="asunto"
                        {...form.getInputProps('asunto')}
                        c="cyan"
                    />
                    <Textarea
                        mt="md"
                        label="Mensaje"
                        maxRows={10}
                        minRows={5}
                        autosize
                        name="mensaje"
                        {...form.getInputProps('mensaje')}
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
