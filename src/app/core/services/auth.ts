import { Injectable } from '@angular/core';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class Auth {

  private readonly pruebaUser:User={
    email: "admin01@gmail.com",
    password: "123456"
  }
  constructor() { }
  login(user:User): boolean{
    if(user.email===this.pruebaUser.email && user.password===this.pruebaUser.password){
      localStorage.setItem("user",JSON.stringify(user));
      return true;
    }
    return false;
  }

  isAuth():boolean{
    return !!localStorage.getItem("user")
  }

  cerrarSesion():void{
    localStorage.removeItem("user")
  }
  
}
