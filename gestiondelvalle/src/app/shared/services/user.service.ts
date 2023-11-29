import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
} from '@angular/fire/auth';
import { User } from '../../models/user.interface';
import { Observable } from 'rxjs';
import {
  Firestore,
  collection,
  addDoc,
  collectionData,
  doc,
  deleteDoc,
  setDoc,
  getDoc,
  DocumentData,
  DocumentSnapshot,
  query,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { from } from 'rxjs';
import { getDocs } from '@firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private auth: Auth, private firestore: Firestore) {}

  register(datos: User) {
    return createUserWithEmailAndPassword(
      this.auth,
      datos.correo,
      datos.contraseña
    );
  }

  guardarDatos(uid: string, datos: User) {
    const datosRef = doc(this.firestore, 'usuarios', uid);
    return setDoc(datosRef, { ...datos, uid });
  }

  login({ email, password }: any) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  loginWithGoogle() {
    return signInWithPopup(this.auth, new GoogleAuthProvider());
  }

  logout() {
    return signOut(this.auth)
    .then(() => {
      console.log("Sesión cerrada correctamente");
      })
      .catch((error) => {
      console.log("Error al cerrar la sesión:", error);
      });
    }

    getUser(): Observable<User[]> {
      const userRef = collection(this.firestore, 'usuarios');
      return collectionData(userRef, { idField: 'id' }) as Observable<User[]>;
    }

    stateUser(){
      return this.auth.onAuthStateChanged
    }

    isLoggedIn(): Observable<boolean> {
      return new Observable<boolean>(observer => {
        this.auth.onAuthStateChanged(user => {
          if (user) {
            observer.next(true); // Usuario está logueado
          } else {
            observer.next(false); // Usuario no está logueado
          }
          observer.complete();
        });
      });
    }

    getUserByUid(uid: string): Observable<User | null> {
      const userRef = doc(this.firestore, 'usuarios', uid);
      return from(getDoc(userRef)).pipe(
        map((snapshot: DocumentSnapshot<DocumentData>) => {
          if (snapshot.exists()) {
            const data = snapshot.data();
            return { uid: snapshot.id, ...data } as User;
          } else {
            return null;
          }
        })
      );
    }

    async updateUser(user: User) {
      const userRef = collection(this.firestore, 'usuarios');

    }

}
