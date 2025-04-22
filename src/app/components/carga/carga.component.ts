import { Component } from '@angular/core';
import { FileItem } from '../../models/file-item';
import { SubirP66Service } from '../../services/subir-p66.service';

@Component({
  selector: 'app-carga',
  templateUrl: './carga.component.html',
  styles: ``
})
export class CargaComponent {
  archivos:FileItem[]=[];
  estaSobreElemento=false;



  constructor(private _subirImagenes:SubirP66Service){}
  subirImagenes(){
    
    this._subirImagenes.subirImagenesFirebase(this.archivos);
    console.log("Subir imagenes...");
  }

}
