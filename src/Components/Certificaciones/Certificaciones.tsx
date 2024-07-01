import {
  Title,
  SimpleGrid,
  Container,
  Divider,
  Text
} from '@mantine/core';
import { useFetch } from '../useFetch'
import classes from './Certificaciones.module.css';
import { CardType } from '../../Types/apiTypes';
import CardComponent from '../CardComponent/CardComponent';



export function Certificaciones() {
  const { data } = useFetch('certificaciones/')
  return (
    <>
      <Container size="lg" py="xl" id='certificaciones'>
        <Divider my="lg" color="cyan.3"/>
        <Title order={2} c="cyan" className={classes.title} ta="center" mt="sm">
          Certificaciones
        </Title>
        
        <Text mt="sm" size="lg" ta="center" c="dimmed">
          Cuento con distintas certificaciones, la mayoria en el instituto <span style={{fontWeight: 'bold'}}>Educacion IT </span>
          tanto en desarrollo con Python, JavaScript, como en Systemas GNU/Linux y DevOps.
        </Text>
        <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl" mt={50}>
          {data?.map((certificacion: CardType) => (
            <CardComponent key={certificacion.id} datos={certificacion} />
          ))}
        </SimpleGrid>
      </Container>
    </>
  );
}