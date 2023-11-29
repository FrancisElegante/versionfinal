import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../../shared/services/user.service';
import { Component, OnInit, inject } from '@angular/core';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  _router = inject(Router);

  formLogin: FormGroup;

  constructor(
    private userService: UserService,
    private router: Router
    
  ) {
    this.formLogin = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    })
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.userService.login(this.formLogin.value)
      .then(response => {
        console.log(response);
      })
      .catch(error => console.log(error));
      this._router.navigate(['/main']);

  }


  navigateToUserAdd() {
    this.router.navigate(['/main']);
  }

}
