import { Component } from '@angular/core';
import { Auth } from '../../core/services/auth';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../core/models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  messageError="";

  userLogin=new FormGroup({
    email:new FormControl<string>("",{nonNullable:true,validators:[Validators.required,Validators.email]}),
    password:new FormControl<string>("",{nonNullable:true ,validators:[Validators.required]})
  })
  constructor(private authService:Auth, private router:Router){}
  get email(){return this.userLogin.get("email")}
  get password(){return this.userLogin.get("password")}
  
  handleSubmit():void{
    const user:User=this.userLogin.getRawValue();

    const auth=this.authService.login(user)
    if(auth){
      this.router.navigate([""])
    }else{
      console.log("error")
      this.messageError="Correo y/o contraseña incorrecta"
    }

  }

}
