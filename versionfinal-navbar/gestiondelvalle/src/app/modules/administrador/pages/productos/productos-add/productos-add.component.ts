import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductosService } from 'src/app/shared/services/productos.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-productos-add',
  templateUrl: './productos-add.component.html',
  styleUrls: ['./productos-add.component.css']
})
export class ProductosAddComponent implements OnInit{
  formulario: FormGroup;
  _router = inject(Router);

  constructor(private productosService: ProductosService, private router: Router) {
    this.formulario = new FormGroup({
      nombre: new FormControl('', Validators.required), // Agrega Validators.required para hacerlo obligatorio
      descripcion: new FormControl('', Validators.required),
      tipo: new FormControl('', Validators.required),
      image: new FormControl('', Validators.required),
      precio: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
  }

  async onSubmit() {
    
    const nuevoProducto = {
      id: Date.now().toString(),
      ...this.formulario.value
    };

    const response = await this.productosService.addPlayer(nuevoProducto);
    console.log(response);
    this._router.navigate(['/productos']);

  }
}
