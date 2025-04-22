import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from '../../models/usuario.models';
import { NgForm } from '@angular/forms';
import { AuthP66Service } from '../../services/auth-p66.service';
import Swal from 'sweetalert2';  
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuario: UsuarioModel = new UsuarioModel();
  recordar=false;
  
  constructor(private _authP66: AuthP66Service,
              private router : Router
  ) { }

  ngOnInit() {
    if(localStorage.getItem(`email`)){
      this.usuario.email=localStorage.getItem(`email`);
      this.recordar=true;
    }

  }

  login(f2: NgForm) {
    if (f2.invalid) { return; }

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',   // Usar comillas simples
      text: 'Espere por favor',
    });

    Swal.showLoading();

    this._authP66.login(this.usuario)
      .subscribe({
        next: resp => {
          console.log('next:', resp);
          if(this.recordar){
            localStorage.setItem(`email`, this.usuario.email);
          }else{
            localStorage.removeItem(`email`);
          }
          this.router.navigateByUrl(`/home`) 
        },
        error: error => {
          console.log('ERROR:', error.error.error.message);
      
          Swal.fire({
            icon: 'error',
            title: 'Error en Login-p66',
            text: error.error.error.message
          });
        },
        complete: () => {
          console.log('Login exitoso');
          Swal.close();
        },
      });
  }
}
