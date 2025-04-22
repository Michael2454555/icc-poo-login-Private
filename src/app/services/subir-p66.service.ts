import { Injectable } from '@angular/core';
import {  CollectionReference, Firestore, addDoc, collection } from '@angular/fire/firestore';
import { FileItem } from '../models/file-item';
import { Storage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class SubirP66Service {
  private CARPETA_IMAGENES=`img`;
  private userCollection:CollectionReference;



  constructor(private db:Firestore,
              private storage:Storage) { 
                console.log(`FIRESTORES, db`,this.db);
                this.userCollection=collection(this.db,this.CARPETA_IMAGENES);


                
  }
  private guardarImagen(imagen:{nombre:string, url:string}){
    addDoc(this.userCollection,imagen).then(ref=>{
      console.log(`Ìmagen guardada en FIRESTORE, referencia:` , ref);
    });

  }

  subirImagenesFirebase(imagenes:FileItem[]){
    console.log(imagenes);
    this.guardarImagen({nombre:imagenes[0].nombreArchivo,url:imagenes[0].url});
  }
}
