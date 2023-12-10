
// Importaciones de Angular, Firebase y RxJS
import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider } from '@angular/fire/auth';
import { Firestore, collection, addDoc, collectionData, doc, deleteDoc, setDoc, getDoc, DocumentData, DocumentSnapshot, query, updateDoc, where } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { getDocs } from '@firebase/firestore';
import { User } from '../../models/user.interface'; // Modelo de usuario personalizado

// Decorador Injectable, marca la clase como disponible para ser proporcionada e inyectada como dependencia
@Injectable({
  providedIn: 'root',
})
export class UserService {
  // Constructor con inyección de dependencias para Auth y Firestore
  constructor(private auth: Auth, private firestore: Firestore) {}

  // Método para registrar un nuevo usuario con email y contraseña
  register(datos: User) {
    return createUserWithEmailAndPassword(this.auth, datos.email, datos.password);
  }

  // Método para guardar datos del usuario en Firestore
  guardarDatos(uid: string, datos: User) {
    const datosRef = doc(this.firestore, 'usuarios', uid);
    return setDoc(datosRef, { ...datos, uid });
  }

  // Método para iniciar sesión con email y contraseña
  login({ email, password }: any) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  // Método para iniciar sesión con Google
  loginWithGoogle() {
    return signInWithPopup(this.auth, new GoogleAuthProvider());
  }

  // Método para cerrar la sesión del usuario
  logout() {
    return signOut(this.auth)
      .then(() => {
        console.log("Sesión cerrada correctamente");
      })
      .catch((error) => {
        console.log("Error al cerrar la sesión:", error);
      });
  }

  // Método para obtener todos los usuarios de Firestore como un Observable
  getUser(): Observable<User[]> {
    const userRef = collection(this.firestore, 'usuarios');
    return collectionData(userRef, { idField: 'id' }) as Observable<User[]>;
  }

  // Método para obtener el estado de autenticación del usuario
  stateUser(){
    return this.auth.onAuthStateChanged
  }

  // Método para verificar si el usuario está logueado y devolver un Observable con la respuesta
  isLoggedIn(): Observable<boolean> {
    return new Observable<boolean>(observer => {
      this.auth.onAuthStateChanged(user => {
        observer.next(!!user); // Devuelve true si el usuario está logueado, de lo contrario false
        observer.complete();
      });
    });
  }

  // Método para obtener un usuario específico por UID de Firestore y devolverlo como un Observable
  getUserByUid(uid: string): Observable<User | null> {
    const userRef = doc(this.firestore, 'usuarios', uid);
    return from(getDoc(userRef)).pipe(
      map((snapshot: DocumentSnapshot<DocumentData>) => {
        return snapshot.exists() ? { uid: snapshot.id, ...snapshot.data() } as User : null;
      })
    );
  }

  // Método asíncrono para actualizar los datos de un usuario en Firestore
  async updateUser(user: User) {
    const userRef = collection(this.firestore, 'usuarios');
    const q = query(userRef, where('id', '==', user.uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (userDoc) => {
      const docRef = doc(this.firestore, 'usuarios', userDoc.id);
      await updateDoc(docRef, { ...userDoc.data() });
    });
  }
}
