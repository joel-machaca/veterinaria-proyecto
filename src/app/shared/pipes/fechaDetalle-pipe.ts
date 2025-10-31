import { WeekDay } from '@angular/common';
import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'FechaDetalle',
})
export class FechaDetallePipe implements PipeTransform {

  transform(value: string|Date,tipoDetalle:'diaSemana'|'dia'|'mes'|'anio'):string {
    if(!value) return ""
    const fecha=new Date(value)

    switch(tipoDetalle){
      case('diaSemana'):
        return fecha.toLocaleDateString("es-Es",{weekday:'long'}).replace(/^./,(c)=>c.toLocaleUpperCase())
      case('dia'):
        return fecha.getDay().toString()
      case('mes'):
        return fecha.toLocaleDateString("es-Es",{month:'short'}).replace(".","").replace(/^./,(c)=>c.toLocaleUpperCase())
      case('anio'):
        return fecha.getFullYear().toString()
    }
  }

}
