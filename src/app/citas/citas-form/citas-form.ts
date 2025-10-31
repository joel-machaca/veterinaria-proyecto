import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Cita, EstadoCita, TipoServicio } from '../../core/models/cita';
import { Citas } from '../../core/services/citas';
import { Mascotas } from '../../core/services/mascotas';
import { Dueno } from '../../core/models/dueno';
import { Especie, Mascota, Sexo } from '../../core/models/mascota';


@Component({
  selector: 'app-citas-form',
  imports: [ReactiveFormsModule],
  templateUrl: './citas-form.html',
  styleUrl: './citas-form.css',
})
export class CitasForm {

  messageError=""
  duenoExiste=false
  tipoServicio=Object.values(TipoServicio)
  mascotasObtenidas:Mascota[]=[];
  BuscarUsado=false
  idError=""
  duenoEncontrado?:Dueno;

  servicio=Object.values(TipoServicio)
  obtenerId=new FormControl("")

  constructor( private citasService:Citas,private mascotaService:Mascotas){}

  citaForm=new FormGroup({
    id: new FormControl<string>("",{nonNullable:true,validators:[Validators.required]}),
    duenoId: new FormControl<string>("",{nonNullable:true,validators:[Validators.required]}),
    duenoNombre: new FormControl<string>("",{nonNullable:true,validators:[Validators.required]}),
    duenoApellido: new FormControl<string>("",{nonNullable:true,validators:[Validators.required]}),
    duenoTelefono: new FormControl<string>("",{nonNullable:true,validators:[Validators.required]}),
    duenoEmail: new FormControl<string>("",{nonNullable:true,validators:[Validators.required]}),
    duenoDireccion: new FormControl<string>("",{nonNullable:true,validators:[Validators.required]}),

    mascotaNombre: new FormControl<string>("",{nonNullable:true,validators:[Validators.required]}),
    mascotaEspecie: new FormControl<Especie>(Especie.Otros,{nonNullable:true,validators:[Validators.required]}),
    mascotaRaza: new FormControl<string>("",{nonNullable:true,validators:[Validators.required]}),
    mascotaSexo: new FormControl<Sexo>(Sexo.indefinido,{nonNullable:true,validators:[Validators.required]}),
    mascotaFechaNacimiento: new FormControl<string>("",{nonNullable:true,validators:[Validators.required]}),

    fecha: new FormControl<string>("",{nonNullable:true,validators:[Validators.required]}),
    hora: new FormControl<string>("",{nonNullable:true,validators:[Validators.required]}),
    detalle: new FormControl<string>("",{nonNullable:true,validators:[Validators.required]}),
    servicio: new FormControl<TipoServicio>(TipoServicio.Vacunacion,{nonNullable:true,validators:[Validators.required]}),
    estado: new FormControl<EstadoCita>(EstadoCita.Pendiente,{nonNullable:true,validators:[Validators.required]}),
  })

  handleSubmit(){
    if(!this.duenoExiste){
      this.messageError="no se encontro ningun dueño con ese id, por favor registrarlo antes de solicitar una cita";
      console.log(this.messageError)
      return 
    }
    console.log(this.citaForm.value)
      const cita=this.citaForm.getRawValue();
      const mascotaData=this.mascotaService.MascotaPorNombre(this.mascotasObtenidas,cita.mascotaNombre)
      const mascotaCita:Mascota={
        nombre:cita.mascotaNombre,
        especie:mascotaData!.especie,
        raza:mascotaData!.raza,
        sexo:mascotaData!.sexo,
        fechaNacimiento:mascotaData!.fechaNacimiento,
      }
      const duenoCita:Dueno={
        id:this.duenoEncontrado!.id,
        nombre:this.duenoEncontrado!.nombre,
        apellido:this.duenoEncontrado!.apellido,
        telefono:this.duenoEncontrado!.telefono,
        email:this.duenoEncontrado!.email,
        direccion:this.duenoEncontrado!.direccion,
        mascotas:[mascotaCita]
      }
      const createCita:Cita={
        id:this.citasService.createId(),
        user:duenoCita,
        mascota:mascotaCita,
        fecha:cita.fecha,
        hora:cita.hora,
        detalle:cita.detalle||"",
        servicio:cita.servicio,
        citaRealizada:new Date(),
        estado:EstadoCita.Pendiente
      }
      console.log(createCita)
      this.citasService.guardar(createCita)

    this.citaForm.reset();
  }

  buscarPorId(){
    
    this.BuscarUsado=true
    const idObtenido=this.citaForm.get("id")?.value
    if (!idObtenido){
      this.idError="campo obligatorio"
      return undefined
    }
    const duenoObtenido=this.mascotaService.obtenerPorId(idObtenido)
    if(!duenoObtenido){
      this.idError="no existe dueño con este id"
      this.duenoEncontrado=undefined
      return
    }
    this.idError=""
    this.duenoExiste=true
    this.duenoEncontrado=duenoObtenido;
    this.mascotasObtenidas=duenoObtenido.mascotas
    console.log("datos mascota: ",this.mascotasObtenidas)
    console.log(this.duenoEncontrado)
  }

}
