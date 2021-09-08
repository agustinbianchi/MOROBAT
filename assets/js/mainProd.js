//FUNCION QUE SE EJECUTA CUANDO SE CARGA EL DOM
$(document).ready(function () {
    if("CARRITO" in localStorage){
        const arrayLiterales = JSON.parse(localStorage.getItem("CARRITO"));
        if(arrayLiterales.length > 0){
            for (const literal of arrayLiterales) {
                carrito.push(new Producto(literal.id, literal.categoria, literal.marca, literal.tamanio, literal.precio, literal.imagen, literal.cantidad));
            }
            //console.log(carrito);
            carritoUI(carrito);
        }
    }
    $(".dropdown-menu").click(function (e) { 
        e.stopPropagation();
    });
    //CARGA ASINCRONA DE INFORMACION DE PRODUCTOS DE ORIGEN LOCAL (producto.json)
    $.get('../data/productos.json',function(datos, estado){
        console.log(datos);
        console.log(estado);
        if(estado == 'success'){
            for (const literal of datos) {
                productos.push(new Producto(literal.id, literal.categoria, literal.marca, literal.tamanio, literal.precio, literal.imagen, literal.cantidad));
            }
        }
        console.log(productos);
        //GENERAR INTERFAZ DE PRODUCTOS CON UNA FUNCION
        productosUI(productos, '#productosContenedor');
    });
});
//FUNCION QUE SE EJECUTA CUANDO SE CARGA TODA LAS IMAGENES DE LA APLICACION
window.addEventListener('load',()=>{
    //ELIMINAR ELEMENTO DEL DOM
    $('#indicadorCarga').remove();
    //MOSTRAR ELEMENTO CON UN FADE
    $('#productosContenedor').fadeIn("slow");
})
//GENERAR OPCIONES PARA FILTRAR POR CATEGORIA
selectUI(categorias,"#filtroCategorias");
//DEFINIR EVENTOS SOBRE EL SELECT GENERADO
$('#filtroCategorias').change(function (e) { 
    //OBTENEMOS EL NUEVO VALOR DEL SELECT
    const value = this.value;
    //SOLUCION CON ANIMACIONES
    $('#productosContenedor').fadeOut(600,function(){
        //EL FILTRO SE REALIZA UNA VEZ OCULTO EL CONTENEDOR
        if(value == 'TODOS'){
            productosUI(productos, '#productosContenedor');
        }else{
            const filtrados = productos.filter(producto => producto.categoria == value);
            productosUI(filtrados, '#productosContenedor');
        }
        //MOSTRAR UNA VEZ GENERADOS LOS PRODUCTOS
        $('#productosContenedor').fadeIn();
    });
});
//DEFINIR EVENTOS SOBRE EL INPUT DE BUSCADA -> USA keyup cuando la tecla se suelta
$("#busquedaProducto").keyup(function (e) { 
    const criterio = this.value.toUpperCase();
    console.log(criterio);
    if(criterio != ""){
                                                        //el resulado de esto es verdadero
        const encontrados = productos.filter(p =>       p.marca.includes(criterio.toUpperCase()) 
                                                    || p.categoria.includes(criterio.toUpperCase())
                                                    || p.tamanio.includes(criterio.toUpperCase()));
        productosUI(encontrados, '#productosContenedor');
    }
});
//DEFINIR EVENTOS SOMBRE EL INPUT DE FILTRO DE PRECIO
$(".inputPrecio").change(function (e) { 
    const min = $("#minProducto").val();
    const max = $("#maxProducto").val();
    if((min > 0) && (max > 0)){
                                                 //el resulado de esto es verdadero
        const encontrados = productos.filter(p => p.precio >= min && p.precio <= max);
        productosUI(encontrados, '#productosContenedor');
    }
});
