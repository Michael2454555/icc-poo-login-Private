import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from '../../models/usuario.models';
import { NgForm } from '@angular/forms';
import { AuthP66Service } from '../../services/auth-p66.service';
import Swal from 'sweetalert2';
import { Route, Router } from '@angular/router';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario:UsuarioModel
  recordar: boolean=false;
  constructor(private _authP66: AuthP66Service,
              private router :Router
  ) { }

  ngOnInit() {
    this.usuario = new UsuarioModel();
   // this.usuario.nombre = "Pablo -";
    //this.usuario.email = "pablo@ups.com";
    
  }
  onSubmit(form : NgForm){
    //console.log("Formulario enviado");
    //console.log(this.usuario);
    //console.log(form);
    if(form.invalid){return;}
    Swal.fire({
      allowOutsideClick:false,
      icon:`info`,
      text:`Espere por favor`

      

    })
    this._authP66.nuevoUsuario(this.usuario)
                    .subscribe({
                      next:resp=>{
                        console.log('next:', resp);
                        if(this.recordar){
                          localStorage.setItem(`email`, this.usuario.email);
                        }else{
                          localStorage.removeItem(`email`);
                        }
                        this.router.navigateByUrl(`/home`)  
                      },

                      error: error=>{console.log('ERROR:', error.error.error.message);
                        Swal.fire({
                          icon:`error`,
                          title: `Error al crear nuevo Usuario`,
                          text: error.error.error.message
                        });
                      },
                      complete:()=>{
                        console.log('Se ha terminado la creación de Nuevo Usuario:');
                        Swal.close();
                      }
                    });

  }


}
