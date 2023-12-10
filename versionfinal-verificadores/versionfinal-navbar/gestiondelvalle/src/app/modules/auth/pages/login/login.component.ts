import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../../shared/services/user.service';
import { MessagesModule } from 'primeng/messages';
import { Message } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {
  messages: Message[] = [];
  _router = inject(Router);

  //formulario
  formLogin: FormGroup = new FormGroup({

    email: new FormControl('', [
      Validators.required,
      this.emailValidator()
    ]),
    password: new FormControl('', [
      Validators.required,
      this.passwordValidator()
    ]),
  });

  constructor(
    private userService: UserService,
    private router: Router,
    private messageService: MessageService
  ) { }

  ngOnInit() { }

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

  showSuccess() {
    this.messageService.add({ severity: 'success', summary: 'Sesion Iniciada', detail: 'Sesion iniciada correctamente' });
  }

  showError() {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error, no se pudo iniciar sesion. Compruebe las credenciales' });
  }

  onSubmit() {
    this.userService.login(this.formLogin.value)
      .then(response => {
        console.log(response);
        this.showSuccess();
        setTimeout(() => {
          this._router.navigate(['']);
        }, 2000);
      })
      .catch(error => {
        console.log(error);
        this.showError();
      });
  }

  onClick() {
    this.userService.loginWithGoogle()
      .then(response => {
        console.log(response);
        this._router.navigate(['']);
      })
      .catch(error => console.log(error));
  }

  redireccion() {
    this._router.navigate(['/auth/register']);

  }

  navigateToUserAdd() {
    this._router.navigate(['']);
  }
}
