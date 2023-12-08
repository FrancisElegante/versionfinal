import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../../../../shared/services/user.service';


import { MessagesModule } from 'primeng/messages';
import { Message } from 'primeng/api';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  
  messages: Message[] = []; // Inicializa messages como un array vacío


  _router = inject(Router);
  formLogin: FormGroup;



  constructor(
    private userService: UserService,
    private router: Router,
    private message:MessagesModule
  ) {
    this.formLogin = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    })
  }



  ngOnInit() {
    this.messages = [{ severity: 'success', summary: 'Success', detail: 'Message Content' }];
  }

  onSubmit() {
    this.userService.login(this.formLogin.value)
      .then(response => {
        console.log(response);
        alert("Sesion Iniciada!")
        this._router.navigate(['']); 


      })
      .catch(error =>{  
      console.log(error);
      alert("No se pudo iniciar sesion, compruebe credenciales")
      this._router.navigate(['']);
    })
  }

  onClick() {
    this.userService.loginWithGoogle()
      .then(response => {
        console.log(response);
        this._router.navigate(['']);
      })
      .catch(error => console.log(error))
  }
  navigateToUserAdd() {
    this._router.navigate(['']);
  }
  }
  