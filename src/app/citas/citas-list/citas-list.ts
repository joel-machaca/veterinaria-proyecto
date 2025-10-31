import { Component, OnInit } from '@angular/core';
import { Citas } from '../../core/services/citas';
import { Cita, EstadoCita } from '../../core/models/cita';
import { FechaDetallePipe } from '../../shared/pipes/fechaDetalle-pipe';
import { CommonModule } from '@angular/common';
import { CancelarIcon } from '../../shared/icons/cancelar-icon/cancelar-icon';
import { ConfirmarIcon } from '../../shared/icons/confirmar-icon/confirmar-icon';
import { CompletadoIcon } from '../../shared/icons/completado-icon/completado-icon';



@Component({
  selector: 'app-citas-list',
  standalone:true,
  imports: [FechaDetallePipe, CommonModule,CancelarIcon,ConfirmarIcon,CompletadoIcon],
  templateUrl: './citas-list.html',
  styleUrl: './citas-list.css',
})
export class CitasList implements OnInit{
  citas:Cita[]=[];
  estadoCita=EstadoCita

  constructor( private citaService:Citas){ }

  ngOnInit(){
    this.citas=this.citaService.obtenerTodos();
  }

  handleState(id:string,nuevoEstado: EstadoCita){
    this.citaService.actualizarEstadoCita(id,nuevoEstado)
    this.citas=this.citaService.obtenerTodos()
  }



}
