import { Component } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { User } from 'firebase/auth';
import { Router } from '@angular/router';
import { Firestore} from '@angular/fire/firestore';
import { AfterViewInit, ElementRef, OnInit, inject } from '@angular/core';
import { UserService } from './shared/services/user.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'gestiondelvalle';
}
