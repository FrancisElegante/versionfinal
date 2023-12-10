import { Component, OnInit } from '@angular/core';
import { Firestore, collection, doc, getDoc, setDoc } from '@angular/fire/firestore';
import { User } from 'firebase/auth';
import { Auth } from '@angular/fire/auth';
import { FormControl, FormGroup, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { UserCredential, updatePassword } from 'firebase/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Message } from 'primeng/api';


@Component({
  selector: 'app-contrasena',
  templateUrl: './contrasena.component.html',
  styleUrls: ['./contrasena.component.css'],
  providers: [MessageService]
})
export class ContrasenaComponent implements OnInit {

  seguridadForm: FormGroup;
  contraseñaActual = '';
  messages: Message[] = []; // Inicializa messages como un array vacío

  constructor(private firestore: Firestore, private auth: Auth, private router: Router,private messageService: MessageService) {
    this.seguridadForm = new FormGroup({
      password: new FormControl('', [
        Validators.required,
        this.passwordValidator(),
      ]),
      confirmPassword: new FormControl('',
        Validators.required),
    },
      {
        validators: this.matchingPasswordsValidator('password', 'confirmPassword')
      });
  }

  ngOnInit(): void {
    this.cargarContraseñaActual();
  }


  showSuccess() {
    this.messageService.add({ severity: 'success', summary: 'Contraseña Cambiada!', detail: 'Contraseña cambiada correctamente' });
  }

  showError() {
    this.messageService.add({ severity: 'error', summary: 'Error al cambiar la contraseña!', detail: 'Error, no se pudo cambiar la contraseña. Intentelo mas tarde' });
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
        this.showError()
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
            this.showSuccess();
            console.log('Contraseña actualizada exitosamente.');
            setTimeout(() => {
              this.router.navigate(['/usuario/usuario']);
            }, 2000);
          }).catch((error) => {
            console.error('Error al actualizar la contraseña en el módulo de autenticación:', error);
            this.showError()

          });
        }).catch((error) => {
          console.error('Error al actualizar la contraseña en Firestore:', error);
          this.showError()

        });
      } else {
        console.error('Las contraseñas no coinciden.');
        this.showError()

      }
    }
  }


}
