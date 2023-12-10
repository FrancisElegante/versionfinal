import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { debounceTime, Observable } from 'rxjs';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import {switchMap } from 'rxjs/operators';


import { ProductosService } from 'src/app/shared/services/productos.service';
import { Productos } from 'src/app/models/productos.interface';
import { MensajeriaService } from 'src/app/shared/services/mensajeria.service';

import { User } from 'src/app/models/user.interface';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})

export class UsuariosComponent {
  productos$!: Observable<Productos[]>;
  _productosService = inject(ProductosService);
  _router = inject(Router);
  searcher = new FormControl('');
  _mensajeriaService = inject(MensajeriaService);

  usuarios$!: Observable<User[]>;

  ngOnInit(): void {
    this.usuarios$ = this._productosService.getUsuarios(); // Sin filtro inicial
  
    this.searcher.valueChanges.pipe(debounceTime(500)).subscribe((search) => {
      this.usuarios$ = this._productosService.getUsuarios(search || '');
    });
  }

  enviarMensaje(usuario: User) {
    // Aquí debes navegar a la página del chat o realizar las acciones necesarias para iniciar una conversación con el usuario
    // Puedes utilizar this._router.navigate(...) o realizar otras acciones según tu lógica de aplicación
    // Además, puedes llamar a una función del servicio de mensajería para iniciar la conversación
    // Por ejemplo:
    const conversationId = usuario.uid; // Puedes usar el ID del usuario como ID de la conversación
    this._mensajeriaService.iniciarConversacion(conversationId);
  }
  
}

