import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { User } from 'firebase/auth';
import { Router } from '@angular/router';
import { Firestore} from '@angular/fire/firestore';
import { AfterViewInit, ElementRef, inject } from '@angular/core';
import { UserService } from './shared/services/user.service';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  tittle="gestiondelvalle"

  constructor(private primengConfig: PrimeNGConfig) {}

  ngOnInit() {
      this.primengConfig.ripple = true;
  }
}