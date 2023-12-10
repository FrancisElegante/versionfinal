import { AfterViewInit, Component, ElementRef, OnInit, inject, ViewChild  } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { User } from 'firebase/auth';
import { debounceTime, Observable } from 'rxjs';
import { Firestore, collection, addDoc, collectionData, doc, deleteDoc, setDoc, getDoc, DocumentReference } from '@angular/fire/firestore';
import { Router, NavigationEnd } from '@angular/router';

import { UserService } from 'src/app/shared/services/user.service';
import { User as Userinterface } from "../../../../models/user.interface";
import { ProductosService } from 'src/app/shared/services/productos.service';
import { Productos } from "../../../../models/productos.interface";

import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, AfterViewInit{



  tipoProductoSeleccionado: string = '';

  buscar: string = '';
  lista_productos: any = [];
  lista_imagenes: any = [];
  dynamicText: string = '';
  _productosService = inject(ProductosService);
  productos$!: Observable<Productos[]>;
  nombreusuario: string = '';
  apellidousuario: string = '';
  user$!: Observable<Userinterface[]>;
  inicie: number = 0

  user: User | null = null; // Initialize with null
  login: boolean = false;
  rol: 'comprador' | 'admin' = 'comprador';

  constructor(private elementRef: ElementRef, private auth: Auth, private userService: UserService, private firestore: Firestore,  private router: Router)  {
    this.userService.isLoggedIn().subscribe((loggedIn: boolean) => {
      if (loggedIn) {
        console.log('El usuario está logueado');
        
        // Realiza las acciones necesarias cuando el usuario está logueado
        this.login = true;
        // Obtener el UID del usuario logueado
        const user = this.auth.currentUser;
        if (user) {
          const uid = user.uid;
          this.getDatosUser3(uid); // Pasar el UID a la funciónk
        }
      } else {
        console.log('El usuario no está logueado');
        // Realiza las acciones necesarias cuando el usuario no está logueado
        this.login = false;
      }
    });

  }
  


  
  //CODIGO NUEVO VERIFICAR --------------------------------------------------------------
  productos: Productos[] = [];
  productoSeleccionado: Productos | undefined;
  tiposProductos: string[] = [];

  //--------------------------------------------------------------

  
  searcher = new FormControl('');

  ngOnInit(): void {

    this.productos$ = this._productosService.getPlayers(); // Sin filtro inicial
  
    this.searcher.valueChanges.pipe(debounceTime(500)).subscribe((search) => {
      this.productos$ = this._productosService.getPlayers(search || '');
    });

    //this.obtener_productos();
    this.user$ = this.userService.getUser();

    this.productos$ = this._productosService.getPlayers();

    //codigo nuevo VERIFICAR -----------------------------------------------------------------------------
    this._productosService.getPlaces().subscribe(productos => {
      this.productos = productos;
      this.tiposProductos = Array.from(new Set(productos.map(producto => producto.tipo))); // filtrado productos

      console.log(this.productos); // Asegúrate de que los datos se estén asignando correctamente
      console.log(this.tiposProductos)
    }, error => {
      console.error('Error al obtener los productos:', error);
    });
    
    //--------------------------------------------------------------
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').then(registration => {
        registration.update().then(() => {
          // Actualización de la caché completada
          // Puedes realizar acciones adicionales aquí si es necesario
          window.location.reload(); // Recarga la página para obtener la versión actualizada de los recursos
        });
      });
    }
    

  }


  getDatosUser() {
    this.user$.subscribe((users: Userinterface[]) => {
      if (users.length > 0) {
        console.log(users[0]); // Accede al primer usuario de la lista
      }
    });
  }

  //CODIGO NUEVO VERIFICAR---------------------------------------------------------
  addToCart(producto: Productos) {
    // Obtener el UID del usuario logueado
    const uid = this.auth.currentUser?.uid;
    
    if (uid) {
      // Crear una referencia al documento del carrito del usuario
      const carritoRef = doc(this.firestore, `usuarios/${uid}/carrito/${producto.id}`);
    
      // Verificar si el carrito ya existe
      getDoc(carritoRef).then((snapshot) => {
        if (snapshot.exists()) {
          // El carrito ya existe, obtener el arreglo de productos
          const carritoData = snapshot.data();
          const productos = carritoData?.['productos'] || [];
          alert("producto agregado al carrito")
          // Verificar si el producto ya está presente en el arreglo
          const existingProduct = productos.find((p: Productos) => p.id === producto.id);
          
          if (existingProduct) {
            // El producto ya existe, actualizar su cantidad
            existingProduct.cantidad = (existingProduct.cantidad || 0) + 1;
            console.log("Cantidad después de la actualización:", existingProduct.cantidad);
          } else {
            // El producto no existe, agregarlo al arreglo
            productos.push({ ...producto, cantidad: 1 });
          }
    
          setDoc(carritoRef, { ['productos']: productos }, { merge: true });
          console.log("El carrito existe, entre en el primer IF");
        } else {
          // El carrito no existe, crearlo y agregar el producto
          const productos = [{ ...producto, cantidad: 1 }];
          setDoc(carritoRef, { ['productos']: productos });
        }

      }).catch((error) => {
        console.error('Error al acceder al carrito:', error);
      });
    }
  }
  
  
  
  
  
  
  
  

  //-----------------------------------------------------------------------------


  seleccionarProducto(producto: Productos) {
    this.productoSeleccionado = producto;
  }

  getDatosUser3(uid: string | undefined) {
    if (uid) {
      this.userService.getUserByUid(uid).subscribe(user => {
        if (user) {
          console.log('Usuario encontrado:', user);
          this.nombreusuario = user.nombre;
          this.apellidousuario= user.apellido
          console.log('Rol usuario', user.rol);
  
          if (this.productoSeleccionado) {
            //??
          }
  
          if (user.rol === 'comprador' || user.rol === 'admin') {
            this.rol = user.rol;
          } else {
            this.rol = 'comprador';
          }
        } else {
          console.log('Usuario no encontrado');
        }
      });
    }
  }

//-----------------------------------------------------------------------------------CODIGO INSPECCION--------------------------------------------------------

inspeccionar(producto : Productos){
  const productId = producto.id;
  console.log(productId)
  this.router.navigate(['/productoseleccionado', productId]);
  console.log("estoy funcionando :)")
}

  ngAfterViewInit(): void {
    this.configureSlider();
    

    
  }



 // async obtener_productos() {
   // const datos_recibidos = await fetch('https://dummyjson.com/products');
    //const datos_definitivos = await datos_recibidos.json();
    //this.lista_productos = datos_definitivos.products;
    //this.lista_imagenes = datos_definitivos.images;
 //}

  configureSlider() {
    const slider = this.elementRef.nativeElement.querySelector("#slider");
    const sliderSection = this.elementRef.nativeElement.querySelectorAll(".slider__section");
    const sliderSectionLast = sliderSection[sliderSection.length - 1];

    const btnLeft = this.elementRef.nativeElement.querySelector("#btn-left");
    const btnRight = this.elementRef.nativeElement.querySelector("#btn-right");

    if (slider && sliderSection && sliderSectionLast && btnLeft && btnRight) {
      slider.insertAdjacentElement('afterbegin', sliderSectionLast);

      function Next() {
        const sliderSectionFirst = slider.querySelectorAll(".slider__section")[0];
        slider.style.marginLeft = "-200%";
        slider.style.transition = "all 0.5s";
        setTimeout(function () {
          slider.style.transition = "none";
          slider.insertAdjacentElement('beforeend', sliderSectionFirst);
          slider.style.marginLeft = "-100%";
        }, 500);
      }

      function Prev() {
        const sliderSection = slider.querySelectorAll(".slider__section");
        const sliderSectionLast = sliderSection[sliderSection.length - 1];
        slider.style.marginLeft = "0";
        slider.style.transition = "all 0.5s";
        setTimeout(function () {
          slider.style.transition = "none";
          slider.insertAdjacentElement('beforeend', sliderSectionLast);
          slider.style.marginLeft = "-100%";
        }, 500);
      }



      btnRight.addEventListener('click', function () {
        Next();
      });

      btnLeft.addEventListener('click', function () {
        Prev();
      });

      setInterval(function () {
        Next();
      }, 5000);
    }
  }





}
