import {
  SimpleGrid,
  Container,
  Divider,
  Text
} from '@mantine/core';
import { useFetch } from '../useFetch';
import { CardType } from '../../Types/apiTypes';
import CardComponent from '../CardComponent/CardComponent';

export function Certificaciones() {
  const { data, loading, error } = useFetch<CardType[]>('certificaciones/');

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Container size="lg" py="xl" id='certificaciones'>
      <Divider my="lg" color="cyan.3" >
        Certificaciones
      </Divider>

      <Text mt="sm" size="lg" ta="center" c="dimmed">
        He obtenido diversas certificaciones, principalmente a través del instituto <b>Educación IT</b>.<br />
        Estas abarcan áreas clave como desarrollo en Python y JavaScript, así como sistemas GNU/Linux y prácticas DevOps.<br />
        Estas acreditaciones validan mi experiencia y conocimientos en tecnologías fundamentales para el desarrollo de software moderno y la administración de sistemas.
      </Text>
      <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl" mt={50}>
        {data?.map((certificacion: CardType) => (
          <CardComponent key={certificacion.id} datos={certificacion} />
        ))}
      </SimpleGrid>
    </Container>
  );
}
