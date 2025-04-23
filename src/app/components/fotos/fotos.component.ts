import { Component, OnInit } from '@angular/core';
import { Firestore, collection, getDocs, CollectionReference, query } from '@angular/fire/firestore';

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
export class FotosComponent implements OnInit {
  private itemsCollection: CollectionReference<Item>;
  public items: Item[] = [];

  constructor(private afs: Firestore) {
    this.itemsCollection = collection(this.afs, 'img') as CollectionReference<Item>;
  }

  async ngOnInit(): Promise<void> {
    try {
      const q = query(this.itemsCollection);
      const querySnap = await getDocs(q);

      this.items = querySnap.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      console.log('ITEMS:', this.items);
    } catch (error) {
      console.error('Error al obtener fotos:', error);
    }
  }

  onImgError(event: Event) {
    (event.target as HTMLImageElement).src = 'assets/img/placeholder.png';
  }
}
