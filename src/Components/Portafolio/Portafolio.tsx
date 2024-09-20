import { Container, Divider, SimpleGrid, Text, Title } from '@mantine/core';
import { useFetch } from '../useFetch'
import CardComponent from '../CardComponent/CardComponent';
import { CardType } from '../../Types/apiTypes';


export function Portafolio() {
    const { data } = useFetch<CardType[]>('proyectos/')
    return (
        <Container size="lg" id='portafolio'>
            <Divider my="md" color="cyan.3" label={
                <Title>
                    Portafolios
                </Title>
            } />
            <Text mt="sm" size="lg" ta="center" c="dimmed">
                En esta seccion hay tanto proyectos personales como trabajos realizados como Freelancer.
            </Text>
            <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl" mt={50}>
                {data?.map((certificacion: CardType) => (
                    <CardComponent key={certificacion.id} datos={certificacion} />
                ))}
            </SimpleGrid>
        </Container>
    );
}