import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { debounceTime, Observable } from 'rxjs';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import {switchMap } from 'rxjs/operators';


import { ProductosService } from 'src/app/shared/services/productos.service';
import { Productos } from 'src/app/models/productos.interface';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  productos$!: Observable<Productos[]>;
  _productosService = inject(ProductosService);
  _router = inject(Router);
  searcher = new FormControl('');

  ngOnInit(): void {
    this.productos$ = this._productosService.getPlayers(); // Sin filtro inicial
  
    this.searcher.valueChanges.pipe(debounceTime(500)).subscribe((search) => {
      this.productos$ = this._productosService.getPlayers(search || '');
    });
  }

  editPlayer(productos: Productos) {
    this._router.navigateByUrl('/administrador/productos-edit', { state: { productos } });
    console.log(productos)
    console.log(this.productos$)
  }

  deletePlayer(productos: Productos) {
    if (confirm(`Seguro de borrar a ${productos.nombre}`)) {
      if (productos.id) { // Verificar que el ID esté definido
        this._productosService.deletePlayer(productos.id);
      }
    }
  }
  
}
