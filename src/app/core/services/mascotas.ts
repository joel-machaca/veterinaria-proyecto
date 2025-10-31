import { Injectable } from '@angular/core';
import { Dueno } from '../models/dueno';
import { Mascota } from '../models/mascota';

@Injectable({
  providedIn: 'root'
})
export class Mascotas {

  constructor() { }

  guardar(dueno:Dueno){
    const duenos:Dueno[]=this.obtenerTodos()
    duenos.push(dueno)
    localStorage.setItem("duenos",JSON.stringify(duenos))
  }

  obtenerTodos():Dueno[]{
    const duenos=localStorage.getItem("duenos");
    return duenos?JSON.parse(duenos):[]
  }

  obtenerPorId(id:string):Dueno|undefined {
    const duenos=localStorage.getItem("duenos");
    if(!duenos) return undefined;
    const dataDuenos:Dueno[]=JSON.parse(duenos)
    const duenoEncontrado=dataDuenos.find((dueno)=>dueno.id===id)
    return duenoEncontrado
  }
  MascotaPorNombre(mascotas:Mascota[] ,nombre:string):Mascota|undefined{
    const mascotaDatos=mascotas.find((m)=>m.nombre===nombre)
    return mascotaDatos
  }
  

}
