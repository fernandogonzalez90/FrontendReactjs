import React, { ReactNode } from 'react';
import { Container, Divider, Title, Text, Paper, Center } from "@mantine/core";
import { HeaderMegaMenu } from "../HeaderMegaMenu/HeaderMegaMenu";

interface SectionTitleProps {
    children: ReactNode;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ children }) => (
    <Title order={3} ta="center" c="cyan" mb="md">
        {children}
    </Title>
);

// interface SectionTextProps {
//     children: ReactNode;
// }

// const SectionText: React.FC<SectionTextProps> = ({ children }) => (
//     <Text size="lg" ta="center" c="dimmed" mb="lg">
//         {children}
//     </Text>
// );

interface BulletPointProps {
    children: ReactNode;
}

const BulletPoint: React.FC<BulletPointProps> = ({ children }) => (
    <Text mt="xs" mb="sm" size="md" c="dimmed">
        - {children}
    </Text>
);

export const Servicios: React.FC = () => {
    return (
        <>
            <HeaderMegaMenu />
            <Container size="lg" id="portafolio">
                {/* <Divider my="md" color="cyan.3" /> */}
                <Title order={2} ta="center" c="cyan" mt="sm" pt="lg">
                    Servicios Freelancer
                </Title>
                <Center>
                    <Text ta="center" c="dimmed" size="lg" w={500}>
                        Estoy comprometido a ofrecer soluciones eficientes y de alta calidad para satisfacer las necesidades de mis clientes en cada proyecto que emprendo.
                    </Text>
                </Center>
                <br />

                <Paper p="lg" bg="dark" shadow="xs" mb="lg">
                    <SectionTitle>Perfil Profesional</SectionTitle>
                    <Divider my="md" color="cyan.3" />
                    <Text>
                        Soy desarrollador Fullstack con orientación DevOps Engineer, estando dentro de mi stack:
                    </Text>
                    <Text mt="xs">
                        <b>Frontend:</b> JavaScript, TypeScript, ReactJS, Bootstrap, Mantine UI y Material UI
                    </Text>
                    <Text mt="xs">
                        <b>Backend:</b> Python, Django, FastAPI, SqlAlchemy, PostgreSQL, SQLite3
                    </Text>
                    <Text mt="xs">
                        <b>DevOps:</b> AWS, Terraform, Docker, Git, Jenkins, Ansible y Bash
                    </Text>
                </Paper>

                <Paper p="lg" bg="dark" shadow="xs" mb="lg">
                    <SectionTitle>Áreas de Especialización</SectionTitle>
                    <Divider my="md" color="cyan.3" />
                    <BulletPoint>Automatización de formularios para agilizar procesos.</BulletPoint>
                    <BulletPoint>Extracción y transformación de datos a partir de archivos para su posterior exportación.</BulletPoint>
                    <BulletPoint>Implementación de atajos de teclado personalizados para optimizar tareas específicas.</BulletPoint>
                    <BulletPoint>Integración y manipulación de bases de datos para su exportación o transformación.</BulletPoint>
                    <BulletPoint>Desarrollo de APIs para la interacción entre sistemas.</BulletPoint>
                    <BulletPoint>Creación de aplicaciones con formularios para el almacenamiento en bases de datos.</BulletPoint>
                    <BulletPoint>Manipulación de imágenes para la extracción de información relevante.</BulletPoint>
                </Paper>

                <Paper p="lg" bg="dark" shadow="xs" mb="lg">
                    <SectionTitle>Proyectos de Front-End</SectionTitle>
                    <Divider my="md" color="cyan.3" />
                    <BulletPoint>Diseño y desarrollo de Landing Pages atractivas y funcionales.</BulletPoint>
                    <BulletPoint>Creación de aplicaciones web modernas y responsivas.</BulletPoint>
                    <BulletPoint>Integración con APIs externas para la obtención y presentación de datos.</BulletPoint>
                    <BulletPoint>Desarrollo de sitios web con secciones administrativas para la gestión de contenidos.</BulletPoint>
                </Paper>

            </Container >
        </>
    );
};
