import { Dueno } from "./dueno";
import { Mascota } from "./mascota";

export interface Cita {
    id:string;
    user:Dueno;
    mascota:Mascota;
    fecha:string;
    hora:string;
    detalle?:string;
    servicio:TipoServicio;
    citaRealizada:Date;
    diagnostico?:string;
    tratamiento?:string;
    estado:EstadoCita;
}

export enum TipoServicio{
    ConsultaGeneral = 'Consulta general',
    Vacunacion = 'Vacunación',
    Desparasitacion = 'Desparasitación',
    Control = 'Control de salud',
    Cirugia = 'Cirugía',
}

export enum EstadoCita{
    Pendiente='Pendiente',
    Confirmada="Confirmada",
    Cancelada='Cancelada',
    Completada='Completada',
}
