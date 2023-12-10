import { Injectable } from '@angular/core';
import {
  getDoc,
  query,
  updateDoc,
  where,
} from '@angular/fire/firestore';

import { getDocs } from '@firebase/firestore';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Productos } from '../../models/productos.interface';
import {  Firestore, collection, addDoc, collectionData, doc, deleteDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private productosSource = new BehaviorSubject<any | null>(null);
  productos$ = this.productosSource.asObservable();

  constructor(private firestore: Firestore) {}

  addPlayer(productos: Productos) {
    const productosRef = collection(this.firestore, 'productos');
    return addDoc(productosRef, productos);
  }

  getPlayers(filter = ''): Observable<Productos[]> {
    const productosRef = collection(this.firestore, 'productos');
    let q = query(productosRef);
    if (filter) {
      // Convertir la primera letra del filtro a mayúscula
      const capitalizedFilter = filter.charAt(0).toUpperCase() + filter.slice(1);
      q = query(productosRef, where('nombre', '>=', capitalizedFilter), where('nombre', '<=', capitalizedFilter + '\uf8ff'));
    }
    return collectionData(q) as unknown as Observable<Productos[]>;
  }
  
  

  async updatePlayer(productos: Productos) {
    const productosRef = collection(this.firestore, 'productos');
    let q = query(productosRef, where('id', '==', productos.id));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(async (document) => {
      const docRef = doc(this.firestore, 'productos', document.id);
      await updateDoc(docRef, { ...productos });
    });
  }

  async deletePlayer(id: string) {
    const productosRef = collection(this.firestore, 'productos');
    let q = query(productosRef, where('id', '==', id));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(async (document) => {
      const docRef = doc(this.firestore, 'productos', document.id);
      deleteDoc(docRef);
    });
  }

  addPlace(productos: Productos) {
    const productosRef = collection(this.firestore, 'productos');
    return addDoc(productosRef, productos);
  }

  getPlaces(): Observable<Productos[]> {
    const productosRef = collection(this.firestore, 'productos');
    return collectionData(productosRef, { idField: 'id' }) as Observable<Productos[]>;
  }

  deletePlace(productos: Productos) {
    const productosDocRef = doc(this.firestore, `productos/${productos.id}`);
    return deleteDoc(productosDocRef);
  }

  async updateProductId(productId: string, newId: string): Promise<void> {
    const productoRef = doc(this.firestore, 'productos', productId);
    await updateDoc(productoRef, { id: newId });
  }
  




}
