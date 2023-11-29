import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/services/user.service';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

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
