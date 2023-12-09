import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../../../../shared/services/user.service';
import { MessageModule } from 'primeng/message';
import { Message } from 'primeng/api';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [MessageService]
})
export class RegisterComponent implements OnInit {

  formReg: FormGroup;
  _router = inject(Router);
  value!: string;
  messages: Message[] = []; // Inicializa messages como un array vacío



  constructor(private userService: UserService, private messageService: MessageService
    ) {
    this.formReg = new FormGroup({
      nombre: new FormControl('', [
        Validators.required,
      ]),
      rol: new FormControl('comprador'),
      apellido: new FormControl('', [
        Validators.required,
      ]),
      sexo: new FormControl('', [
        Validators.required,
      ]),
      edad: new FormControl('', [
        Validators.required,
      ]),
      email: new FormControl('', [
        Validators.required,
        this.emailValidator()
      ]),
      imagen: new FormControl(

      ),
      password: new FormControl('', [
        Validators.required,
        this.passwordValidator(),
      ]),
      contraseña2: new FormControl('',
        Validators.required),
    }, { validators: this.matchingPasswordsValidator('password', 'contraseña2') });
  }

  showSuccess() {
    this.messageService.add({ severity: 'success', summary: 'Cuenta Creada!', detail: 'Cuenta creada correctamente' });
  }

  showError() {
    this.messageService.add({ severity: 'error', summary: 'Error al crear la cuenta!', detail: 'Error, no se pudo crear la cuenta. Intentelo mas tarde' });
  }

  ngOnInit(): void {
    this.messages = [{ severity: 'error', summary: 'Error', detail: 'Closable Message Content' }];

  }



  emailValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const emailValue: string = control.value;
      const isValid = emailValue.includes('@');
      return isValid ? null : { requiresAtSymbol: true };
    };
  }

  passwordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const passwordValue: string = control.value;
      const isValid = passwordValue.length >= 6;
      return isValid ? null : { passwordTooShort: true };
    };
  }

  matchingPasswordsValidator(passwordField: string, confirmPasswordField: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.get(passwordField)?.value;
      const confirmPassword = control.get(confirmPasswordField)?.value;
      return password === confirmPassword ? null : { passwordsDoNotMatch: true };
    };
  }



  mostraralerta() {
    alert('¡Formulario enviado!');
  }

  onSubmit(): void {
    this.userService.register(this.formReg.value)
      .then(response => {
        console.log(response);
        console.log("Éxito al crear usuario");
        const uid = response.user.uid;
        this.userService.guardarDatos(uid, this.formReg.value)
          .then(() => {
            console.log("Datos guardados en Firestore");
            this.showSuccess();
            setTimeout(() => {
              this._router.navigate(['/auth/login']);
            }, 2000);
          })
          .catch(error => {
            console.log("Error al guardar los datos en Firestore:", error);
            this.showError();
          });
      })
      .catch(error => {
        console.log(error);
        console.log("Fallo al crear usuario");
        this.showError();
      });
  }

}
