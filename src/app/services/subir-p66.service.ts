import { Injectable } from '@angular/core';
import {  CollectionReference, Firestore, addDoc, collection } from '@angular/fire/firestore';
import { FileItem } from '../models/file-item';
import { getDownloadURL, ref, Storage, uploadBytesResumable } from '@angular/fire/storage';


@Injectable({
  providedIn: 'root'
})
export class SubirP66Service {
  private CARPETA_IMAGENES='img';
  private userCollection:CollectionReference;



  constructor(private db:Firestore,
              private storage:Storage) { 
                console.log('FIRESTORES, db',this.db);
                this.userCollection=collection(this.db,this.CARPETA_IMAGENES);


                
  }
  private guardarImagen(imagen:{nombre:string, url:string}){
    addDoc(this.userCollection,imagen).then(ref=>{
      console.log('Ìmagen guarda en FIRESTORE, referencia:' , ref);
    });

  }

  subirImagenesFirestore(imagenes:FileItem[]){
    console.log('Ìmagenes',imagenes);
    for(const imagen of imagenes ){
      imagen.estaSubiendo=true;
      if(imagen.progress>=100){
        continue;
      }
      const filePath='${this.CARPETA_IMAGENES}/${imagen.nombreArchivo}';
      const storageRef=ref(this.storage,filePath);
      const upLoadTask=uploadBytesResumable(storageRef,imagen.archivo);
      upLoadTask.on('state_changed',(snapshot)=>{
        imagen.progress=(snapshot.bytesTransferred/snapshot.totalBytes)*100;

      },(error)=>{
        console.error('ERROR en subir archivo:'+imagen.nombreArchivo+'al storage');
      },()=>{
        getDownloadURL(upLoadTask.snapshot.ref).then((URL_paraBajar)=>{
          console.log('Archivo disponible en :', URL_paraBajar);
          imagen.url=URL_paraBajar;
          this.guardarImagen({
            nombre:imagen.nombreArchivo, url: imagen.url ||''
          })
        })
      });
      imagen.estaSubiendo=false;
    }

  }
}
