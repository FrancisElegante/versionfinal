import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductosService } from 'src/app/shared/services/productos.service';
import { Productos } from 'src/app/models/productos.interface';

import { Message } from 'primeng/api';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-productos-edit',
  templateUrl: './productos-edit.component.html',
  styleUrls: ['./productos-edit.component.css'],
  providers: [MessageService]
  
})
export class ProductosEditComponent implements OnInit{
  form: FormGroup;
  producto: Productos | null = null;
  messages: Message[] = []; // Inicializa messages como un array vacío

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private productosService: ProductosService,
    private messageService: MessageService
  ) {
    this.form = this.formBuilder.group({
      nombre: ['',
       Validators.required
      ],
      descripcion: ['',
       Validators.required
      ],
      tipo: ['',
       Validators.required
      ],
      precio: ['',
       Validators.required
      ],
      image: ['',
       Validators.required
      ]
    });
  }

  showSuccess() {
    this.messageService.add({ severity: 'success', summary: 'Producto editado!', detail: 'Producto editado correctamente' });
  }

  showError(errorMsg: string) {
    this.messageService.add({ severity: 'error', summary: 'Error al editar el producto!', detail: errorMsg });
  }

  ngOnInit(): void {
    this.producto = history.state.productos; // Corregir el nombre de la propiedad

    // Inicializa el formulario con las validaciones
    this.form = this.formBuilder.group({
      nombre: [this.producto?.nombre || '', Validators.required],
      descripcion: [this.producto?.descripcion || '', Validators.required],
      tipo: [this.producto?.tipo || '', Validators.required],
      precio: [this.producto?.precio || '', Validators.required],
      image: [this.producto?.image || '', Validators.required]
    });
  }
  

  updateProducto(): void {
    if (this.form.invalid || !this.producto) {
      return;
      console.log("ERROR")
    }

    
  
    const updatedProduct: Productos = {
      id: this.producto.id,
      ...this.form.value
    };

    this.productosService.updatePlayer(updatedProduct)
      .then(() => {
        console.log('Producto actualizado');
        this.showSuccess();
        setTimeout(() => {
          this.router.navigateByUrl('/administrador/productos');
        }, 2000);
  
      })
      .catch((error) => {
        console.error('Error al actualizar el producto', error);
        this.showError('Error, no se pudo crear la cuenta. Intentelo más tarde');
      });
  }
}
