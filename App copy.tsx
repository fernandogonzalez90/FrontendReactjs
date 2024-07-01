import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { HeaderMegaMenu } from "./Components/HeaderMegaMenu/HeaderMegaMenu";
import { Inicio } from "./Components/Inicio/Inicio";
import { Certificaciones } from "./Components/Certificaciones/Certificaciones";
import { Skills } from "./Components/Skills/Skills";
import { Portafolio } from "./Components/Portafolio/Portafolio";
import { Contacto } from "./Components/Contacto/Contacto";
import { FooterSocial } from "./Components/FooterSocial/FooterSocial";
import {AuthProvider} from "./Components/"


export default function App() {
  return
  <AuthProvider>
    <MantineProvider defaultColorScheme="dark">
      <HeaderMegaMenu></HeaderMegaMenu>
      {/* Inicio */}
      <Inicio></Inicio>
      {/* Certificaciones */}
      <Certificaciones></Certificaciones>
      {/* Skills */}
      <Skills></Skills>
      {/* Portafolio */}
      <Portafolio></Portafolio>
      {/* Contacto */}
      <Contacto></Contacto>
      {/* Footer */}
      <FooterSocial></FooterSocial>
    </MantineProvider>;
  </AuthProvider>


}
