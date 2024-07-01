import { Container, Divider, SimpleGrid, Title, Text } from '@mantine/core';
import { useFetch } from '../useFetch'
import CardComponent from '../CardComponent/CardComponent';
import { CardType } from '../../Types/apiTypes';


export function Portafolio() {
    const { data } = useFetch('proyectos/')
    return (
        <Container size="lg" id='portafolio'>
            <Divider my="md" color="cyan.3" />
            <Title order={2} ta="center" c="cyan" mt="sm" pt="lg">
                Portafolio
            </Title>
            <Text mt="sm" size="md" ta="center" c="dimmed">
                Todos los proyectos estan alojados en GitHub y los Frontend se pueden visualizar en vivo.
            </Text>
            <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl" mt={50}>
                {data?.map((certificacion: CardType) => (
                    <CardComponent key={certificacion.id} datos={certificacion} />
                ))}
            </SimpleGrid>
        </Container>
    );
}