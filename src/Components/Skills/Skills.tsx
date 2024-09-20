import {
    Text,
    SimpleGrid,
    Container,
    Divider,
    Loader,
    Flex,
    ActionIcon,
    Title,
} from '@mantine/core';
import { useFetch } from '../useFetch';
import classes from './Skills.module.css';
import { SkillsType, SoftSkillsType } from '../../Types/apiTypes';
import iconMap from '../IconMap';
import BadgeComponent from '../BadgeComponent/BadgeComponent';

export function Skills() {
    const { data: skillsData } = useFetch<SkillsType[]>('skills/');
    const { data: badgeData } = useFetch<SoftSkillsType[]>('softskills/');

    if (!skillsData || !badgeData) {
        return <Loader size={30} />;
    }

    const items = skillsData.map((item: SkillsType) => (
        <div key={item.titulo} className={classes.item}>
            <ActionIcon variant="transparent" aria-label="Settings" color={item.color} size="xl">
                {iconMap[item.icon]}
            </ActionIcon>
            <Text size="xs" ta="center" c={item.color}>
                {item.titulo}
            </Text>
        </div>
    ));

    const badges = badgeData.map((items: SoftSkillsType) => (
        <BadgeComponent key={items.id} datos={items}></BadgeComponent>
    ));

    return (
        <Container size="lg" id='skills'>
            <Divider my="lg" color="cyan.3" label={
                <Title>
                    Skills
                </Title>
            } />

            <Text mt="sm" size="lg" ta="center" c="dimmed">
                Cuento con las siguientes habilidades blandas y tecnicas.
            </Text>
            <Container size="md">
                <Flex
                    mih={50}
                    gap="xl"
                    justify="center"
                    align="center"
                    direction="row"
                    wrap="wrap"
                >
                    <SimpleGrid cols={{ base: 1, md: 1 }} mb="lg">
                        {badges}
                    </SimpleGrid>
                    <SimpleGrid cols={5} mt="lg">
                        {items}
                    </SimpleGrid>
                </Flex>
            </Container>
        </Container>
    );
}
