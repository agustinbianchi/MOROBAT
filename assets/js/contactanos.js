class Formulario {
    constructor(nombre, email, asunto, consulta) {
        this.nombre = nombre;
        this.email = email;
        this.asunto = asunto;
        this.consulta = consulta;
    }
}

const formularios = [];

contactanos.addEventListener("submit", function (e){
    e.preventDefault();
    const nuevo = new Formulario(document.getElementById("inputNombre").value, document.getElementById("inputEmail").value, document.getElementById("inputAsunto").value, document.getElementById("textArea").value)
    formularios.push (nuevo);
    localStorage.setItem("formularios",JSON.stringify(formularios));
    console.log(nuevo);
})