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
    const conversationId = usuario.uid;
    this._mensajeriaService.iniciarConversacion(conversationId);
    this._router.navigate(['/administrador/chat', conversationId]);
    this._mensajeriaService.setReceiverId(conversationId); // Asegúrate de tener un método en el servicio para establecer el receiverId
  }
  
}

