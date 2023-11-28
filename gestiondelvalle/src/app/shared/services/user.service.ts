import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider } from '@angular/fire/auth';
import { User } from "../../models/user.interface";
import { Observable } from 'rxjs';
import { Firestore, collection, addDoc, collectionData, doc, deleteDoc, setDoc, getDoc, DocumentData, DocumentSnapshot,   query,
  updateDoc,
  where, } from '@angular/fire/firestore';
  import { map } from 'rxjs/operators';
  import { from } from 'rxjs';
  import { getDocs } from '@firebase/firestore';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private auth: Auth, private firestore: Firestore) { }
}
