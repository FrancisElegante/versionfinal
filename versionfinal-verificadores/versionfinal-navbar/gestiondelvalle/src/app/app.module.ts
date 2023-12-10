import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getMessaging, provideMessaging } from '@angular/fire/messaging';
import { getStorage, provideStorage } from '@angular/fire/storage';

import { environment } from './enviorments/enviorments';
import { SharedModule } from './shared/shared.module';
import { MainModule } from './modules/main/main.module';
import { UsuarioModule } from './modules/usuario/usuario.module';
import { NavbarrealComponent } from './modules/compartido/pages/navbarreal/navbarreal.component';

//primeng

import { MessagesModule } from 'primeng/messages';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';


@NgModule({
  declarations: [
    AppComponent,
    NavbarrealComponent,
    
  ],
  imports: [
    BrowserModule,
    MessagesModule,
    AppRoutingModule,
    SharedModule,
    MainModule,
    UsuarioModule,
    BrowserAnimationsModule,
    ButtonModule,
    ToastModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideDatabase(() => getDatabase()),
    provideMessaging(() => getMessaging()),
    provideStorage(() => getStorage())
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule {


  
 }
