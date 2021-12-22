class Articulo {
    constructor(nombre, precio, stock, imagen) {
        this.nombre = nombre;
        this.precio = precio;
        this.stock = stock;
        this.imagen = imagen;
    }

    devolverDatos() {
        return `   
    <div class="card" style="width: 18rem;">
    <img src="${this.imagen}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${this.nombre}</h5>
            <p class="card-text">$ ${this.precio}</p>
            
        </div>
    </div>
    `
    }
}

const articulo1 = new Articulo('Laptop', 65000, 7, './fotos/laptop.jpg');
const articulo2 = new Articulo('Smartphone', 78000, 24, './fotos/smartphone.jpg');
const articulo3 = new Articulo('Monitor', 32000, 4, './fotos/monitor.webp');
const articulo4 = new Articulo('Teclado', 5000, 4, './fotos/teclado.jpg');
const articulo5 = new Articulo('Mouse', 2900, 30, './fotos/mouse.jpg');
const articulo6 = new Articulo('Parlantes', 25000, 15, './fotos/parlantes.jpg');

$('#compra1').append(`
<select class="form-select" id="form-select-precio" aria-label="Default select example">
    <option value="0"> ELIGE UN PRODUCTO </option>
    <option value="${articulo1.precio}"> ${articulo1.nombre} </option>
    <option value="${articulo2.precio}"> ${articulo2.nombre} </option>
    <option value="${articulo3.precio}"> ${articulo3.nombre} </option>
    <option value="${articulo4.precio}"> ${articulo4.nombre} </option>
    <option value="${articulo5.precio}"> ${articulo5.nombre} </option>
    <option value="${articulo6.precio}"> ${articulo6.nombre} </option>
</select>
`
);

// Declaración de variables

let dolares=[];
let formUsuario = document.getElementById("formUsuario");
let formCuotas = document.getElementById("form-select-cuotas");
let formPago = document.getElementById("form-select-pago");
let formPrecio = document.getElementById("form-select-precio");


let listaDeArticulos = [articulo1, articulo2, articulo3, articulo4, articulo5, articulo6];
const enStock = listaDeArticulos.filter(producto => producto.stock > 0);

let precioFinal = 0;
let precioPorCuota = 0;
let cuotas = 1;
let metodoDePago = ' ';
let precioBase = 0;

// Busca precio del dolar mediante API
$(() => {
    fetch("https://criptoya.com/api/dolar")
  .then(response => response.json())
  .then(data => {
    let datosPasados = Object.entries(data)
    datosPasados.forEach(dolar => {
        if(dolar[0] != "time") {   
            dolares.push({tipo: dolar[0], valor: dolar[1]})
        }
        
    })
  });
})

//Crea cards con los productos en el HTML

$(() => {
    enStock.forEach(item => {
        $('#list').append(item.devolverDatos()); 
    })
});

// Declaración de la función que analiza y realiza la venta
const calculoTotal = (precio, cantidadDeCuotas) => {  
    
    if (cantidadDeCuotas >= 1){
        if ( cantidadDeCuotas == 6 ) {
            precioFinal = precio;
            precioPorCuota = precioFinal/cantidadDeCuotas;
        }
        if ( cantidadDeCuotas == 9 ){
            precioFinal = precio + (precio * 0.1);
            precioPorCuota = precioFinal/cantidadDeCuotas; 
        } 
        if ( cantidadDeCuotas == 12 ){
            precioFinal = precio + (precio * 0.2);
            precioPorCuota = precioFinal/cantidadDeCuotas; 
        } 
        if ( cantidadDeCuotas == 18 ){
            precioFinal = precio + (precio * 0.35);
            precioPorCuota = precioFinal/cantidadDeCuotas; 
        }
        if ( cantidadDeCuotas == 1 ) {
            precioFinal = precio;
            precioPorCuota = precioFinal;
        }
    
    } else {
        alert('La cantidad de cuotas ingresada no es valida, por favor Intente nuevamente a continuación --> ');
    } 
    
    let precioDolarizado = precioFinal / dolares[7].valor;
    $('#DivCompra').append(
        `
        <form class="form-floating">
            <p>El precio final de su producto es de U$D${precioDolarizado.toFixed(2)} o $${precioFinal}, y lo va a abonar en ${cantidadDeCuotas} cuota(s), pagando $${precioPorCuota.toFixed(2)} cada cuota.</p>
        </form>
        `
    )

}

// Toma los datos ingresados y llama a la Función

$('#botonEnviarInfoCompra').click(function() {
    
    metodoDePago = formPago.value;
    precioBase = parseInt(formPrecio.value);
    cuotas = parseInt(formCuotas.value);
    calculoTotal(precioBase, cuotas);
    localStorage.setItem('RegistroDeCompra', precioFinal);

});

/*
    GRACIAS POR LAS CLASES A LO LARGO DEL CURSO. MUY CLARAS Y AYUDA MUCHO TENER EJEMPLOS CONSTANTEMENTE.
    ESPERO QUE LE GUSTE MI TRABAJO Y TENERLO EN ALGUN OTRO CURSO.

    SALUDOS.
*/