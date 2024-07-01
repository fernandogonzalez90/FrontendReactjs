import { Title, Container, Group,Avatar, ActionIcon, Flex } from '@mantine/core';
import { Dots } from './Dots';
import { useFetch } from '../useFetch';
import classes from './Inicio.module.css';
import { GeneralType } from '../../Types/apiTypes';
import { FaGithub, FaLinkedin } from "react-icons/fa";

export function Inicio() {
  const { data } = useFetch<GeneralType[]>('general/')


  const items = data?.map((item: GeneralType) => (
    <Flex
      key={item.id}
      gap="md"
      justify="center"
      align="center"
      direction="column"
      wrap="wrap"
    >
      <Avatar
        src={item.imagen}
        size={120}
        radius={120}
        mx="auto"
      />
      <Title order={1} c="cyan">{item.subtitulo}</Title>
      <Title order={3}>{item.titulo}</Title>

      <Group justify="center">
        <ActionIcon variant="transparent" size="xl" color='cyan'>
          <FaGithub />
        </ActionIcon>

        <ActionIcon variant="transparent" size="xl" color='cyan'>
          <FaLinkedin />
        </ActionIcon>
      </Group>
    </Flex>

  ));

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