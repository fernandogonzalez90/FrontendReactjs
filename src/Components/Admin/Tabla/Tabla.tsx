import { useState } from 'react';
import cx from 'clsx';
import { Table, ScrollArea, ActionIcon, Group } from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import classes from './Tabla.module.css';

interface TablaProps<T> {
  data: T[];
  renderRow: (row: T) => JSX.Element;
  headers: string[];
  onEdit: (row: T) => void;
  onDelete: (row: T) => void;
}

export function Tabla<T>({ data, renderRow, headers, onEdit, onDelete }: TablaProps<T>) {
  const [scrolled, setScrolled] = useState(false);

  return (
    <ScrollArea h={400} onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
      <Table miw={700}>
        <Table.Thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
          <Table.Tr>
            {headers.map((header, index) => (
              <Table.Th key={index}>{header}</Table.Th>
            ))}
            <Table.Th>Acciones</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {data.map((row, index) => (
            <Table.Tr key={index}>
              {renderRow(row)}
              <Table.Td>
                <Group>
                  <ActionIcon onClick={() => onEdit(row)} color="blue">
                    <IconEdit size="1rem" />
                  </ActionIcon>
                  <ActionIcon onClick={() => onDelete(row)} color="red">
                    <IconTrash size="1rem" />
                  </ActionIcon>
                </Group>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </ScrollArea>
  );
}