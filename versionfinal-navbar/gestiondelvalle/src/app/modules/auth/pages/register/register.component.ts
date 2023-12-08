import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../../../../shared/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  formReg: FormGroup;
  _router = inject(Router);



  constructor(private userService: UserService) {
    this.formReg = new FormGroup({
      nombre: new FormControl(),
      rol: new FormControl('comprador'),
      apellido: new FormControl(),
      sexo: new FormControl(),
      edad: new FormControl(),
      correo: new FormControl(),
      imagen: new FormControl(),
      contraseña: new FormControl(),
      contraseña2: new FormControl()
    });
  }

  ngOnInit(): void {
  }

  mostraralerta(){
    alert('¡Formulario enviado!');
  }

  onSubmit(): void {
    this.userService.register(this.formReg.value)
      .then(response => {
        console.log(response);
        console.log("Éxito al crear usuario");
        this._router.navigate(['/auth/login']); 
        const uid = response.user.uid;
        this.userService.guardarDatos(uid, this.formReg.value)
          .then(() => {
            console.log("Datos guardados en Firestore");
          })
          .catch(error => {
            console.log("Error al guardar los datos en Firestore:", error);
          });
      })
      .catch(error => {
        console.log(error);
        console.log("Fallo al crear usuario");
      });
  }

}
