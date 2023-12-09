import { NgModule } from '@angular/core';


import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';


import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent}
  
]


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild( routes )
  ]
})
export class AuthroutingModule { }
