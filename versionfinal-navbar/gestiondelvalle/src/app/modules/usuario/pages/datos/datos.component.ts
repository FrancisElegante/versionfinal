import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { Firestore, doc, getDoc, setDoc } from '@angular/fire/firestore';
import { User } from 'firebase/auth';
import { Auth } from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html',
  styleUrls: ['./datos.component.css']
})
export class DatosComponent implements OnInit {

  userForm: FormGroup;
  currentUser: User | null = null;
  userData: any = {};

 notEmptyValidator(control: AbstractControl) {
  const value = control.value;
  if (value === null || value === undefined || value === '') {
    return { 'notEmpty': true };
  }
  return null;
}

  constructor(
    private firestore: Firestore,
    private auth: Auth,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.userForm = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/), this.notEmptyValidator]],
      apellido: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/), this.notEmptyValidator]],
      imagen: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.auth.onAuthStateChanged((user: User | null) => {
      if (user) {
        this.currentUser = user;
        const uid = user.uid;
        const userRef = doc(this.firestore, `usuarios/${uid}`);
        getDoc(userRef).then((snapshot) => {
          if (snapshot.exists()) {
            this.userData = snapshot.data();
            this.userForm.patchValue(this.userData);
          }
        }).catch((error) => {
          console.error('Error al obtener los datos del usuario:', error);
        });
      } else {
        this.currentUser = null;
        this.userData = {};
      }
    });
  }

  guardarDatos() {
    if (this.currentUser) {
      const uid = this.currentUser.uid;
      const userRef = doc(this.firestore, `usuarios/${uid}`);
      const formData = this.userForm.value;
      setDoc(userRef, formData, { merge: true })
        .then(() => {
          console.log('Datos actualizados correctamente');
          this.router.navigateByUrl('/usuario');

        })
        .catch((error) => {
          console.error('Error al actualizar los datos:', error);
        });
    }
  }

}
