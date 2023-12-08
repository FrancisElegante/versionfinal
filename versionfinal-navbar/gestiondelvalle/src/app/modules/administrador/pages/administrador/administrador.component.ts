import { AfterViewInit, Component, ElementRef, OnInit, inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { User } from 'firebase/auth';

import { ProductosService } from 'src/app/shared/services/productos.service';
import { Productos } from 'src/app/models/productos.interface';

import { debounceTime, Observable } from 'rxjs';

import { User as Userinterface } from "src/app/models/user.interface";
import { UserService } from "src/app/shared/services/user.service";

import { Firestore, collection, addDoc, collectionData, doc, deleteDoc, setDoc, getDoc, DocumentReference } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.css']
})
export class AdministradorComponent implements OnInit{
  users$!: Observable<User[]>;
  login: boolean = false;
  rol: 'comprador' | 'admin' = 'comprador';
  nombreusuario: string = '';
  apellidousuario: string = '';
  fotousuario: string = '';
  _router = inject(Router);
  constructor( private elementRef: ElementRef, private auth: Auth, private userService: UserService, private firestore: Firestore) { 
    this.userService.isLoggedIn().subscribe((loggedIn: boolean) => {
      if (loggedIn) {
        console.log('El usuario está logueado');
        // Realiza las acciones necesarias cuando el usuario está logueado
        this.login = true;
        // Obtener el UID del usuario logueado
        const user = this.auth.currentUser;
        if (user) {
          const uid = user.uid;
          this.getDatosUser3(uid); // Pasar el UID a la funciónk
        }
      } else {
        console.log('El usuario no está logueado');
        // Realiza las acciones necesarias cuando el usuario no está logueado
        this.login = false;
      }
    });


  }

  ngOnInit() {

  }

  getDatosUser3(uid: string | undefined) { // Aceptar un UID como parámetro
    if (uid) {
      this.userService.getUserByUid(uid).subscribe(user => {
        if (user) {
          console.log('Usuario encontrado:', user);
          this.nombreusuario = user.nombre;
          console.log('Rol usuario', user.rol)
          // Realiza las acciones necesarias con los datos del usuario
          this.apellidousuario= user.apellido
          this.fotousuario= user.imagen
          if (user.rol === 'comprador' || user.rol === 'admin') {
            this.rol = user.rol;
          } else {
            this.rol = 'comprador'; // Valor predeterminado en caso de rol inválido
          }
        } else {
          console.log('Usuario no encontrado');
          // Realiza las acciones necesarias si el usuario no existe
        }
      });
    }
  }

  editUser(user: User) {
    this._router.navigateByUrl('/misdatos', { state: { user } });
  }

}
