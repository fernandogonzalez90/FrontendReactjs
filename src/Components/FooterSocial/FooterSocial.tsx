import { Container, Group, ActionIcon, rem, Text } from '@mantine/core';
import { FaLinkedin, FaGithub } from "react-icons/fa";

import classes from './FooterSocial.module.css';

export function FooterSocial() {
  return (
    <div className={classes.footer}>
      <Container className={classes.inner}>
      <Text size="xs" c="cyan.4" ta="center">Fernando Gonzalez | DevOps Engineer | Python & JavaScript Developer.</Text>
        <Group gap={0} className={classes.links} justify="flex-end" wrap="nowrap">
          <ActionIcon size="lg" color="cyan" variant="transparent" mx="lg">
            <FaLinkedin style={{ width: rem(18), height: rem(18)}} />
          </ActionIcon>
          <ActionIcon size="lg" color="cyan" variant="transparent">
            <FaGithub style={{ width: rem(18), height: rem(18) }} />
          </ActionIcon>
        </Group>
      </Container>
    </div>
  );
}