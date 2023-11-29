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



}
