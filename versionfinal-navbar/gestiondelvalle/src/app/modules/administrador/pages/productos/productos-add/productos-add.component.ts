import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductosService } from 'src/app/shared/services/productos.service';
import { Router } from '@angular/router';

import { Message } from 'primeng/api';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-productos-add',
  templateUrl: './productos-add.component.html',
  styleUrls: ['./productos-add.component.css'],
  providers: [MessageService]
})
export class ProductosAddComponent implements OnInit {
  formulario: FormGroup;
  _router = inject(Router);
  messages: Message[] = []; // Inicializa messages como un array vacío

  constructor(private productosService: ProductosService, private router: Router, private messageService: MessageService) {
    this.formulario = new FormGroup({
      nombre: new FormControl('',
       Validators.required
       
       ),
      descripcion: new FormControl('',
       Validators.required

       ),
      tipo: new FormControl('',
       Validators.required

       ),
      image: new FormControl('',
       Validators.required

       ),
      precio: new FormControl('',
       Validators.required

       )
    });
  }

  ngOnInit(): void {
  }

  showSuccess() {
    this.messageService.add({ severity: 'success', summary: 'Producto agregado!', detail: 'Producto creado correctamente' });
  }

  showError(errorMsg: string) {
    this.messageService.add({ severity: 'error', summary: 'Error al agregar el producto!', detail: errorMsg });
  }

  async onSubmit() {
    try {
      const nuevoProducto = {
        id: Date.now().toString(),
        ...this.formulario.value
      };

      const response = await this.productosService.addPlayer(nuevoProducto);
      console.log(response);
      this.showSuccess();

    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
      this.showError('Error, no se pudo crear la cuenta. Intentelo más tarde');
    }
  }
}
