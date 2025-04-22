import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioModel } from '../models/usuario.models';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthP66Service {
//https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]
//https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]
  private userToken:string;
  private url = "https://identitytoolkit.googleapis.com/v1/accounts:";
  private apiKey="AIzaSyB65HfpOj_wk1rlwxoOLhKWhTxNpPGgL-k";
  estaAutenticado() {
    if(this.userToken.length<5){
      return false;
    }
    if(!localStorage.getItem(`expira`)){
      this.userToken=``;
      localStorage.removeItem(`token`);
      return false;
    }
    const expira=Number(localStorage.getItem(`expira`));
    const expiraDate=new Date();
    expiraDate.setTime(expira);
    //return expiraDate > new Date();
    if(expiraDate > new Date()){
      return true;
    }else{
      return false;
    }
    return this.userToken && this.userToken.length > 5;
  }
  
  
  guardarToken(idToken:string){
    this.userToken=idToken;
    localStorage.setItem(`token`, idToken);
    let hoy=new Date();
    hoy.setTime(hoy.getTime()+2*3600*1000);
    localStorage.setItem(`expira`, hoy.getTime().toString());
  }
  leerToken(){
    if(localStorage.getItem(`token`)){
      this.userToken=localStorage.getItem(`token`);

    }else{
      this.userToken=``;
    }

    return this.userToken;
  }
  
  
  constructor(private http:HttpClient) {
    this.leerToken();
   }
   
   

  nuevoUsuario(usuario:UsuarioModel){
    const authData={
      email: usuario.email,
      password: usuario.password,
      returnSecureToken: true

    };
    return this.http.post(`${this.url}signUp?key=${this.apiKey}`, authData)
      .pipe(
        map(resp=>{
          console.log(`Creación de nuevo usuario ok`);
          this.guardarToken(resp[`idToken`])

        })
      );

  }
  login(usuario:UsuarioModel){
    const authData={  
      email: usuario.email,
      password: usuario.password,
      returnSecureToken: true

    };
    return this.http.post(`${this.url}signInWithPassword?key=${this.apiKey}`, authData)
              .pipe(
                map(resp=>{
                  console.log(`Login ok`);
                  this.guardarToken(resp[`idToken`])

                })
              );
  }

  logOUT(){
    localStorage.removeItem(`token`);
  }
}
