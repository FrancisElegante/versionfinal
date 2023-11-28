import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';

import { AuthroutingModule } from './authrouting.module';



@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    AuthroutingModule
  ]
})
export class AuthModule { }
