import { Component } from '@angular/core';
import { Firestore, collection, collectionData, CollectionReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Item {
  id?: string;
  nombre: string;
  url: string;
}

@Component({
  selector: 'app-fotos',
  templateUrl: './fotos.component.html',
  styles: []
})
export class FotosComponent {
  itemsCollection: CollectionReference<Item>;
  items: Observable<Item[]>;

  constructor(private afs: Firestore) {
    
    this.itemsCollection = collection(this.afs, 'img') as CollectionReference<Item>;

    
    this.items = collectionData(this.itemsCollection, { idField: 'id' }) as Observable<Item[]>;

   
    this.items.subscribe(arr => console.log('Fotos cargadas:', arr.length, arr));
  }


  onImgError(event: Event) {
    (event.target as HTMLImageElement).src = 'assets/img/placeholder.png';
  }
}
