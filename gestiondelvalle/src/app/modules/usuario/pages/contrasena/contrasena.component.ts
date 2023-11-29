import { Component, OnInit } from '@angular/core';
import { Firestore, collection, doc, getDoc, setDoc } from '@angular/fire/firestore';
import { User } from 'firebase/auth';
import { Auth } from '@angular/fire/auth';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserCredential, updatePassword } from 'firebase/auth';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-contrasena',
  templateUrl: './contrasena.component.html',
  styleUrls: ['./contrasena.component.css']
})
export class ContrasenaComponent implements OnInit{

  seguridadForm: FormGroup;
  contraseñaActual = '';

  constructor(private firestore: Firestore, private auth: Auth,  private router: Router,) {
    this.seguridadForm = new FormGroup({
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    this.cargarContraseñaActual();
  }

  cargarContraseñaActual(): void {
    const user: User | null = this.auth.currentUser;
  
    if (user) {
      const uid = user.uid;
  
      const usuarioRef = doc(this.firestore, `usuarios/${uid}`);
      getDoc(usuarioRef).then((docSnapshot) => {
        if (docSnapshot.exists()) {
          const contraseña = docSnapshot.data()?.['contraseña'] || '';
          this.contraseñaActual = contraseña;
          this.seguridadForm.get('password')?.setValue(this.contraseñaActual);
          this.seguridadForm.get('confirmPassword')?.setValue(this.contraseñaActual);
        }
      }).catch((error) => {
        console.error('Error al cargar la contraseña:', error);
      });
    }
  }

  actualizarContrasena(): void {
    const user: User | null = this.auth.currentUser;
  
    if (user) {
      const uid = user.uid;
      const contraseña = this.seguridadForm.get('password')?.value;
      const confirmarContraseña = this.seguridadForm.get('confirmPassword')?.value;
  
      if (contraseña === confirmarContraseña) {
        const usuarioRef = doc(this.firestore, `usuarios/${uid}`);
        setDoc(usuarioRef, { contraseña }, { merge: true }).then(() => {
          // Actualizar la contraseña en el módulo de autenticación
          updatePassword(user, contraseña).then(() => {
            console.log('Contraseña actualizada exitosamente.');
            this.router.navigateByUrl('/usuario');

          }).catch((error) => {
            console.error('Error al actualizar la contraseña en el módulo de autenticación:', error);
          });
        }).catch((error) => {
          console.error('Error al actualizar la contraseña en Firestore:', error);
        });
      } else {
        console.error('Las contraseñas no coinciden.');
      }
    }
  }


}
