import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Especie, Mascota, Sexo } from '../../core/models/mascota';
import { Dueno } from '../../core/models/dueno';
import { Mascotas } from '../../core/services/mascotas';

@Component({
  selector: 'app-mascotas-form',
  imports: [ReactiveFormsModule],
  templateUrl: './mascotas-form.html',
  styleUrl: './mascotas-form.css',
})
export class MascotasForm {

  idError=""
  duenoObtenido?:Dueno;
  sexo=Object.values(Sexo)
  especie=Object.values(Especie)
  constructor(private mascotaService:Mascotas){}

mascotaForm = new FormGroup({
  id: new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.minLength(8), Validators.maxLength(8), Validators.pattern(/^\d+$/)]
  }),
  nombre: new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.maxLength(25)]
  }),
  apellido: new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.maxLength(30)]
  }),
  telefono: new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.minLength(9) ,Validators.maxLength(9)]
  }),
  email: new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.email]
  }),
  direccion: new FormControl('', {
    nonNullable: true,
    validators: [Validators.maxLength(60)]
  }),
  
  mascotaNombre: new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.maxLength(25)]
  }),
  mascotaEspecie: new FormControl(Especie.Otros, {
    nonNullable: true,
    validators: [Validators.required]
  }),
  mascotaRaza: new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.maxLength(20)]
  }),
  mascotaSexo: new FormControl(Sexo.indefinido, {
    nonNullable: true,
    validators: [Validators.required]
  }),
  mascotaFechaNacimiento: new FormControl('', {
    nonNullable: true,
    validators: [Validators.required]
  }),
});

  handleSubmit(){
    const form=this.mascotaForm.getRawValue();
    console.log(form)
    const nuevaMascota:Mascota={
      nombre:form.mascotaNombre,
      especie:form.mascotaEspecie,
      raza:form.mascotaRaza,
      sexo:form.mascotaSexo,
      fechaNacimiento:form.mascotaFechaNacimiento,
    }
    console.log(this.mascotaForm.value)
    const duenos:Dueno[]=this.mascotaService.obtenerTodos();
    const duenoExistente=duenos.find((d)=>d.id===form.id)

    if(duenoExistente){
      duenoExistente.mascotas=duenoExistente.mascotas||[]
      duenoExistente.mascotas.push(nuevaMascota)
      localStorage.setItem("duenos",JSON.stringify(duenos))
    }else{
      const duenoForm:Dueno={
        id:form.id,
        nombre:form.nombre,
        apellido:form.apellido,
        telefono:form.telefono,
        email:form.email,
        direccion:form.direccion,
        mascotas:[nuevaMascota]
      }
      this.mascotaService.guardar(duenoForm)
    }
    this.mascotaForm.reset();
  }
  buscarPorId(){
    const id=this.mascotaForm.get("id")?.value
    if(!id){
      this.idError="campo obligatorio"
      this.duenoObtenido=undefined
      this.mascotaForm.reset()
      return
    }
    const resultado=this.mascotaService.obtenerPorId(id)
    if(!resultado){
      this.idError="no existe dueño con este id"
      this.duenoObtenido=undefined
      this.mascotaForm.reset()
      return
    }
    this.duenoObtenido=resultado;
    this.idError=""

    this.mascotaForm.patchValue({
      nombre:resultado.nombre,
      apellido:resultado.apellido,
      telefono:resultado.telefono,
      email:resultado.email,
      direccion:resultado.direccion??"",
    })
  }
}
