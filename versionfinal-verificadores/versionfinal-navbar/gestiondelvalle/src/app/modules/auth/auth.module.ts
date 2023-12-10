import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';

import { AuthroutingModule } from './authrouting.module';

import { FormsModule,ReactiveFormsModule, FormGroup, Validators, FormBuilder } from "@angular/forms";


import { MessagesModule } from 'primeng/messages';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { PasswordModule } from 'primeng/password';
@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    AuthroutingModule,
    FormsModule,
    ReactiveFormsModule,
    MessagesModule,
    ButtonModule,
    ToastModule,
    PasswordModule
  ],
  providers:[
    MessageService
  ],
})
export class AuthModule { }
