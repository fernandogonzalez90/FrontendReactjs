// iconMap.tsx
import { IoIosInfinite, IoLogoIonic } from 'react-icons/io';
import { PiCertificateBold } from "react-icons/pi";
import { RxDotsVertical } from "react-icons/rx";
import { FaLinux, FaPython, FaDocker, FaAngular, FaReact, FaGitAlt, FaGithub, FaJenkins, FaAws, FaWordpress } from 'react-icons/fa';
import { JSX } from 'react';
import { SiFlask, SiFastapi, SiKubernetes, SiTerraform, SiGnubash, SiTypescript, SiDjango, SiGitlab, SiGithubactions, SiAnsible, SiGooglecloud, SiGunicorn, SiNginx, SiSelenium, SiGooglecolab } from 'react-icons/si';
import { IoLogoJavascript } from "react-icons/io5";





const iconMap: { [key: string]: JSX.Element } = {
    // Iconos
    RxDotsVertical: <RxDotsVertical style={{ width: '70%', height: '70%' }} />,
    PiCertificateBold: <PiCertificateBold style={{ width: '70%', height: '70%' }} />,

    // DevOps
    IoIosInfinite: <IoIosInfinite />,
    SiTerraform: <SiTerraform style={{ width: '70%', height: '70%' }} />,
    SiKubernetes: <SiKubernetes style={{ width: '70%', height: '70%' }} />,
    FaDocker: <FaDocker style={{ width: '70%', height: '70%' }} />,
    FaGitAlt: <FaGitAlt style={{ width: '70%', height: '70%' }} />,
    FaGithub: <FaGithub style={{ width: '70%', height: '70%' }} />,
    SiGitlab: <SiGitlab style={{ width: '70%', height: '70%' }} />,
    SiGithubactions: <SiGithubactions style={{ width: '70%', height: '70%' }} />,
    FaJenkins: <FaJenkins style={{ width: '70%', height: '70%' }} />,
    SiAnsible: <SiAnsible style={{ width: '70%', height: '70%' }} />,

    // Programacion
    FaPython: <FaPython style={{ width: '70%', height: '70%' }} />,
    IoLogoJavascript: <IoLogoJavascript style={{ width: '70%', height: '70%' }} />,
    SiTypescript: <SiTypescript style={{ width: '70%', height: '70%' }} />,
    SiGnubash: <SiGnubash style={{ width: '70%', height: '70%' }} />,

    // Frameworks
    FaAngular: <FaAngular style={{ width: '70%', height: '70%' }} />,
    FaReact: <FaReact style={{ width: '70%', height: '70%' }} />,
    IoLogoIonic: <IoLogoIonic style={{ width: '70%', height: '70%' }} />,
    SiDjango: <SiDjango style={{ width: '70%', height: '70%' }} />,
    SiFastapi: <SiFastapi style={{ width: '70%', height: '70%' }} />,
    SiFlask: <SiFlask style={{ width: '70%', height: '70%' }} />,


    // Sistemas Operativos
    FaLinux: <FaLinux style={{ width: '70%', height: '70%' }} />,

    // Servidores y Nubes
    FaAws: <FaAws style={{ width: '70%', height: '70%' }} />,
    SiGooglecloud: <SiGooglecloud style={{ width: '70%', height: '70%' }} />,
    SiGunicorn: <SiGunicorn style={{ width: '70%', height: '70%' }} />,
    SiNginx: <SiNginx style={{ width: '70%', height: '70%' }} />,

    // Herramientas
    SiSelenium: <SiSelenium style={{ width: '70%', height: '70%' }} />,
    SiGooglecolab: <SiGooglecolab style={{ width: '70%', height: '70%' }} />,

    // CMS
    FaWordpress: <FaWordpress style={{ width: '70%', height: '70%' }} />,
};

export default iconMap;
