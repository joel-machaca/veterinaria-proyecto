import { Component, OnInit } from '@angular/core';
import { Mascotas } from '../../core/services/mascotas';
import { Mascota } from '../../core/models/mascota';
import { Dueno } from '../../core/models/dueno';
import { FechaDetallePipe } from '../../shared/pipes/fechaDetalle-pipe';

@Component({
  selector: 'app-mascotas-list',
  imports: [],
  templateUrl: './mascotas-list.html',
  styleUrl: './mascotas-list.css',
})
export class MascotasList implements OnInit{
  mascotas:Dueno[]=[]
  constructor(private mascotaService:Mascotas){ }
  ngOnInit(){
    this.mascotas=this.mascotaService.obtenerTodos()
  }

}
