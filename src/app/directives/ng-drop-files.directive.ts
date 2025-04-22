import { Directive,EventEmitter, Input, Output } from '@angular/core';
import { FileItem } from '../models/file-item';

@Directive({
  selector: '[appNgDropFiles]',
  standalone: false
})
export class NgDropFilesDirective {
  
  @Output() mouseSobre:EventEmitter<boolean>=new EventEmitter();
  @Input() archivos:FileItem[]=[];



  constructor() { }

  @HostListener(`dragover`,[`$event`])
  public onDragover(event:any){
    this._prevenirDetener(event);
    this.mouseSobre.emit(true);
  }

  @HostListener(`draglive`, [`$event`])
  public onDragLeave(event:any){
    this.mouseSobre.emit(false);

  }
  @HostListener(`drop`, [`$event`])
  public onDrop(event:any){
    this.mouseSobre.emit(true);
    const transferencia= this._getTransferencia(event);
    if(!transferencia){
      console.error(`Error en transferencia, event: `,event);
      return;
    }
    this._extraerArchivos(transferencia.files);
    this._prevenirDetener(event);
    this.mouseSobre.emit(false);
    
  }
  

  private _prevenirDetener(event){
    event.preventDefault();
    event.stopPropagation();
  }
  private _esImagen(tipoArchivo:String){
    return (tipoArchivo===underfined||tipoArchivo===``)?false:tipoArchivo.scartsWith(`ìmage`);
  }
  private _archivoYaUtilizado(nombreArchivo:string):boolean{
    for (const archivo of this.archivos){
      if(archivo.nombreArchivo === nombreArchivo){
        console.log(`El archivo`+nombreArchivo+` ya està agregado `);
        return true;
      }
    }
    return false;

  }
  private _archivoOkparaUpload(archivo:File):boolean{
    if(!this._archivoYaUtilizado(archivo.name) && this._esImagen(archivo.type)){
      return true;
    }else{
      return false;
    }
  }
  private _getTransferencia(event:any){
    return event.dataTransfer?event.dataTransfer: event.originalEvent.dataTransfer;

  }
  private _extraerArchivos(archivoLista:FileList){
    console.log(`archivoLista: `,archivoLista);
    for(const propiedad in Object.getOwnPropertyNames(archivoLista)){
      const archivoTemporal=archivoLista[propiedad];
      if(!this._archivoOkparaUpload(archivoTemporal)){
        const nuevoFile=new FileItem(archivoTemporal);
        this.archivos.push(nuevoFile);
      }
    }
    console.log(`this.archivos: `, this.archivos);
  }

}
