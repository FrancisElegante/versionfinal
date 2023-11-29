import { Component, OnInit } from '@angular/core';
import { Firestore, collection, collectionData, doc, getDoc, setDoc } from '@angular/fire/firestore';
import { User } from 'firebase/auth';
import { Auth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Validators, FormBuilder, FormGroup, AbstractControl, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-direccion',
  templateUrl: './direccion.component.html',
  styleUrls: ['./direccion.component.css']
})
export class DireccionComponent implements OnInit{
  direccionForm: FormGroup;

  notEmptyValidator(control: AbstractControl) {
    const value = control.value;
    if (value === null || value === undefined || value === '') {
      return { 'notEmpty': true };
    }
    return null;
  }

  constructor(private firestore: Firestore, private auth: Auth,     private router: Router,) {
    this.direccionForm = new FormGroup({
      direccion: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/), this.notEmptyValidator]),
      altura: new FormControl('', [Validators.pattern(/^[0-9]+$/), this.notEmptyValidator]),
      provincia: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/), this.notEmptyValidator]),
      ciudad: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/), this.notEmptyValidator]),
      codigoPostal: new FormControl('', [Validators.pattern(/^[0-9]+$/), this.notEmptyValidator])
    });
  }

  ngOnInit() {
    // Obtener el UID del usuario logueado
    const uid = this.auth.currentUser?.uid;
    if (uid) {
      const direccionRef = doc(this.firestore, `usuarios/${uid}/direccion/datos`);

      // Obtener el documento de dirección si existe
      getDoc(direccionRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            // Si el documento existe, establecer los valores del formulario con los datos guardados
            const direccionData = snapshot.data();
            this.direccionForm.setValue({
              direccion: direccionData['direccion'],
              altura: direccionData['altura'],
              provincia: direccionData['provincia'],
              ciudad: direccionData['ciudad'],
              codigoPostal: direccionData['codigoPostal']
            });
          }
        })
    }
  }

  guardarDireccion() {
    // Obtener el UID del usuario logueado
    const uid = this.auth.currentUser?.uid;
    if (uid) {
      // Obtener los valores del formulario
      const direccion = this.direccionForm.value.direccion;
      const altura = this.direccionForm.value.altura;
      const provincia = this.direccionForm.value.provincia;
      const ciudad = this.direccionForm.value.ciudad;
      const codigoPostal = this.direccionForm.value.codigoPostal;

      // Crear un objeto con los datos de dirección
      const direccionData = {
        direccion,
        altura,
        provincia,
        ciudad,
        codigoPostal
      };

      // Guardar los datos de dirección en la base de datos
      const direccionRef = doc(this.firestore, `usuarios/${uid}/direccion/datos`);
      setDoc(direccionRef, direccionData)
        .then(() => {
          console.log('Datos de dirección guardados correctamente');
          this.router.navigateByUrl('/usuario');

        })
        .catch((error) => {
          console.error('Error al guardar los datos de dirección:', error);
        });
    }
  }
}
