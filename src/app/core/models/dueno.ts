import { Mascota } from "./mascota";

export interface Dueno {
    id:string;
    nombre:string;
    apellido:string;
    telefono:string;
    email:string;
    direccion?:string;
    mascotas:Mascota[];
}
