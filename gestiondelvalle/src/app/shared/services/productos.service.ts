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









}
