export interface CardType {
  id?: number;
  tipo?: string;
  titulo?: string;
  subtitulo?: string;
  institucion?: string;
  descripcion?: string;
  categoria?: string;
  certificado?: string;
  anio?: string;
  imagen?: string;
  github?: string;
  linkedin?: string;
  icon?: string;
  iconos?: string;
  repositorio?: string;
  view_live?: string;
}

export interface CardComponentProps {
  datos: CardType;
}

export interface GeneralType {
  id: string;
  titulo: string;
  subtitulo: string;
  descripcion: string;
  imagen: string | File | null;
  github: string;
  linkedin: string;
  email: string;
  curriculum: string;
}

export interface CertificacionesType {
  id: string;
  titulo: string;
  institucion: string;
  descripcion: string;
  anio: string;
  categoria: string;
  certificado: string;
  icon: string;
}

export interface SkillsType {
  id: string;
  titulo: string;
  categoria: string;
  icon: string;
  color: string;
}

export interface SoftSkillsType {
  id: string;
  titulo: string;
  color: string;
}

export interface BadgeComponentProp {
  datos: SoftSkillsType;
}

export interface ProyectosType {
  id: string;
  titulo: string;
  categoria: string;
  teconologias: string;
  descripcion: string;
  repositorio: string;
  view_live: string;
  iconos: string;
}

export interface ContactoType {
  id: string;
  nombre: string;
  apellido: string;
  email: string;
  asunto: string;
  mensaje: string;
}

export interface AuthContextType {
  token: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}
