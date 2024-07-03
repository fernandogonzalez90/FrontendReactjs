import { Certificaciones } from "../Certificaciones/Certificaciones"
import { Contacto } from "../Contacto/Contacto"
import { HeaderMegaMenu } from "../HeaderMegaMenu/HeaderMegaMenu"
import { Inicio } from "../Inicio/Inicio"
import { Portafolio } from "../Portafolio/Portafolio"
import { Skills } from "../Skills/Skills"

const PublicComponent = () => {
    return (
        <>

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

        </>
    )
}

export default PublicComponent