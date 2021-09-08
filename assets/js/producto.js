//DECLARACION DE CLASE PRODUCTO
class Producto {
    constructor(id, categoria, marca, tamanio, precio, imagen, cantidad) {
        this.id = parseInt(id);
        this.categoria = categoria;
        this.marca = marca;
        this.tamanio = tamanio;
        this.precio = parseFloat(precio);
        this.imagen = imagen;
        this.cantidad = parseInt(cantidad);
    }
    
    agregarCantidad(valor) {
        this.cantidad += valor;
    }

    subtotal() {
        return this.cantidad * this.precio;
    }
}