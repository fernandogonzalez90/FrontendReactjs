import { Title, Container, Group, Avatar, ActionIcon, Flex, Divider } from '@mantine/core';
import { Dots } from './Dots';
import { useFetch } from '../useFetch';
import classes from './Inicio.module.css';
import { GeneralType } from '../../Types/apiTypes';
import { FaGithub, FaLinkedin, FaFilePdf } from "react-icons/fa";

export function Inicio() {
  const { data } = useFetch<GeneralType[]>('general/')

  const items = data?.map((item: GeneralType) => {
    const imageUrl = item.imagen ? (typeof item.imagen === 'string' ? item.imagen : URL.createObjectURL(item.imagen)).replace('http:', 'https:') : undefined;

    return (
      <Flex
        key={item.id}
        gap="md"
        justify="center"
        align="center"
        direction="column"
        wrap="wrap"
      >
        <Avatar
          src={imageUrl}
          size={120}
          radius={120}
          mx="auto"
        />



        <Container size="sm">
          <Title ta="center" order={1}>{item.titulo}</Title>
          <Divider c="cyan" />
          <Title ta="center" order={3} c="cyan">{item.subtitulo}</Title>
          {/* <Text ta='center' c='gray' size='lg'>{item.descripcion}</Text> */}
        </Container>

        <Group justify="center">
          <ActionIcon component="a" variant="transparent" size="xl" color='cyan' href={item.github} target='_blank'>
            <FaGithub />
          </ActionIcon>

          <ActionIcon component="a" variant="transparent" size="xl" color='cyan' href={item.linkedin} target='_blank'>
            <FaLinkedin />
          </ActionIcon>

          <ActionIcon component="a" variant="transparent" size="xl" color='cyan' href={item.curriculum} target='_blank'>
            <FaFilePdf />
          </ActionIcon>
        </Group>
      </Flex>
    );
  });

  return (
    <Container className={classes.wrapper} size={1400}>
      <Dots className={classes.dots} style={{ left: 0, top: 0 }} />
      <Dots className={classes.dots} style={{ left: 60, top: 0 }} />
      <Dots className={classes.dots} style={{ left: 0, top: 140 }} />
      <Dots className={classes.dots} style={{ right: 0, top: 60 }} />
      {items}
    </Container>
  );
}
