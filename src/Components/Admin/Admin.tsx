import {
    TextInput,
    Code,
    UnstyledButton,
    Badge,
    Text,
    Group,
    ActionIcon,
    Tooltip,
    rem,
    Button
} from '@mantine/core';
import { FaRegEnvelope } from "react-icons/fa6";
import { MdOutlineTaskAlt } from "react-icons/md";
import { FaSearchengin } from "react-icons/fa";
import { CiCirclePlus } from "react-icons/ci";
import { BiStats } from "react-icons/bi";

import classes from './Admin.module.css';

const links = [
    { icon: FaRegEnvelope, label: 'Mensajes', notifications: 3 },
    { icon: MdOutlineTaskAlt, label: 'Tasks', notifications: 4 },
    { icon: BiStats, label: 'Visitas' },
];

const collections = [
    { emoji: '👍', label: 'Sales' },
    { emoji: '🚚', label: 'Deliveries' },
    { emoji: '💸', label: 'Discounts' },
    { emoji: '💰', label: 'Profits' },
    { emoji: '✨', label: 'Reports' },
    { emoji: '🛒', label: 'Orders' },
    { emoji: '📅', label: 'Events' },
    { emoji: '🙈', label: 'Debts' },
    { emoji: '💁‍♀️', label: 'Customers' },
];

export function NavbarSearch() {
    const mainLinks = links.map((link) => (
        <UnstyledButton key={link.label} className={classes.mainLink}>
            <div className={classes.mainLinkInner}>
                <link.icon size={20} className={classes.mainLinkIcon} />
                <span>{link.label}</span>
            </div>
            {link.notifications && (
                <Badge size="sm" variant="filled" className={classes.mainLinkBadge}>
                    {link.notifications}
                </Badge>
            )}
        </UnstyledButton>
    ));

    const collectionLinks = collections.map((collection) => (
        <a
            href="#"
            onClick={(event) => event.preventDefault()}
            key={collection.label}
            className={classes.collectionLink}
        >
            <span style={{ marginRight: rem(9), fontSize: rem(16) }}>{collection.emoji}</span>{' '}
            {collection.label}
        </a>
    ));

    return (
        <nav className={classes.navbar}>
            <div className={classes.section}>
                <Button />
            </div>

            <TextInput
                placeholder="Search"
                size="xs"
                leftSection={<FaSearchengin style={{ width: rem(12), height: rem(12) }}  />}
                rightSectionWidth={70}
                rightSection={<Code className={classes.searchCode}>Ctrl + K</Code>}
                styles={{ section: { pointerEvents: 'none' } }}
                mb="sm"
            />

            <div className={classes.section}>
                <div className={classes.mainLinks}>{mainLinks}</div>
            </div>

            <div className={classes.section}>
                <Group className={classes.collectionsHeader} justify="space-between">
                    <Text size="xs" fw={500} c="dimmed">
                        Collections
                    </Text>
                    <Tooltip label="Create collection" withArrow position="right">
                        <ActionIcon variant="default" size={18}>
                            <CiCirclePlus style={{ width: rem(12), height: rem(12) }}  />
                        </ActionIcon>
                    </Tooltip>
                </Group>
                <div className={classes.collections}>{collectionLinks}</div>
            </div>
        </nav>
    );
}