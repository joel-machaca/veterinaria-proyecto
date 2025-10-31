import { Injectable } from '@angular/core';
import { Cita, EstadoCita } from '../models/cita';

@Injectable({
  providedIn: 'root'
})
export class Citas {

  constructor() { }

  guardar(cita:Cita){
    const citas=this.obtenerTodos()
    citas.push(cita)
    localStorage.setItem("citas",JSON.stringify(citas))
  }

  obtenerTodos():Cita[]{
    const citas=localStorage.getItem("citas")
    return citas?JSON.parse(citas):[];
  }
  
  createId():string{
    const citas=this.obtenerTodos()
    if(citas.length===0){
      return (1).toString()
    }
    const idUltimo=parseInt(citas[citas.length-1].id)
    return (idUltimo + 1).toString()
  }

  actualizarEstadoCita(id:string,nuevoEstado:EstadoCita){
    const citas=this.obtenerTodos()
    const citaIndex=citas.findIndex((c)=>c.id===id)
    if(citaIndex!==-1){
      console.log("antes del cambio: ",citas[citaIndex].estado)
      citas[citaIndex].estado=nuevoEstado
      console.log("despues del cambio: ", citas[citaIndex].estado)
      console.log("despues del cambio: ", (citas[citaIndex].estado==="Confirmada"))
      localStorage.setItem("citas",JSON.stringify(citas))
      console.log("comparando:", citas[citaIndex].estado === EstadoCita.Confirmada);
      console.log("valor real:", citas[citaIndex].estado);
    }
  }
}
