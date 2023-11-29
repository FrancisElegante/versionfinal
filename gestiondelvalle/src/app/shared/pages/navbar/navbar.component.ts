import { Component } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { User } from 'firebase/auth';
import { Router } from '@angular/router';
import { Firestore} from '@angular/fire/firestore';
import { AfterViewInit, ElementRef, OnInit, inject } from '@angular/core';
import { UserService } from '../../../shared/services/user.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent {

  user: User | null = null; // Initialize with null
  login: boolean = false;
  rol: 'comprador' | 'admin' = 'comprador';










}
