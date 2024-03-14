$('#modoBtn').click(function () {
    $('body').toggleClass('dark-mode');
    const imgSrc = $('body').hasClass('dark-mode') ? 'https://cdn-icons-png.flaticon.com/512/5261/5261906.png' : 'https://cdn-icons-png.flaticon.com/512/5261/5261906.png';
    $('#modoBtn img').attr('src', imgSrc);
});

const carrito = document.getElementById('carrito');
const elementos1 = document.getElementById('lista-1');
const elementos2 = document.getElementById('lista-2');
const elementos3 = document.getElementById('lista-3');
const lista = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');

cargarEventListeners();

function cargarEventListeners(){
    elementos1.addEventListener('click', comprarElemento);
    elementos2.addEventListener('click', comprarElemento);
    elementos3.addEventListener('click', comprarElemento);
    carrito.addEventListener('click', eliminarElemento);
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
}

function comprarElemento(e){
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        const elemento = e.target.parentElement.parentElement;
        leerDatosElemento(elemento);
    }
}

function leerDatosElemento(elemento){
    const infoElemento = {
        imagen: elemento.querySelector('img').src,
        titulo: elemento.querySelector('h3').textContent,
        precio: elemento.querySelector('.precio').textContent,
        id: elemento.querySelector('a').getAttribute('data-id')
    }
    insertarCarrito(infoElemento);
}

function insertarCarrito(elemento){
    const row = document.createElement('tr');
    row.innerHTML = `
    <td>
        <img src="${elemento.imagen}" width=100 >
    </td>
    <td>
        ${elemento.titulo}
    </td>
    <td>
        ${elemento.precio}
    </td>   
    <td>
        <a href="#" class="borrar" data-id="${elemento.id}">X</a>
    </td>
    `;
    lista.appendChild(row);

    const totalCarrito = sumarTotalCarrito();
    document.getElementById('total-carrito').textContent = `$${totalCarrito.toFixed(2)}`;

    guardarCarritoEnLocalStorage();
}

function guardarCarritoEnLocalStorage() {
    const filas = lista.querySelectorAll('tr');
    const carrito = [];

    filas.forEach((fila) => {
        const elemento = {
            imagen: fila.querySelector('img').src,
            titulo: fila.querySelector('td:nth-child(2)').textContent,
            precio: fila.querySelector('td:nth-child(3)').textContent,
            id: fila.querySelector('a').getAttribute('data-id')
        };
        carrito.push(elemento);
    });

    localStorage.setItem('carrito', JSON.stringify(carrito));
}

function eliminarElemento(e) {
    e.preventDefault();

    if (e.target.classList.contains('borrar')) {
        const elementoPadre = e.target.parentElement.parentElement;
        elementoPadre.remove();

        const totalCarrito = sumarTotalCarrito();
        document.getElementById('total-carrito').textContent = `$${totalCarrito.toFixed(2)}`;
    }
}

function vaciarCarrito() {
    while (lista.firstChild){
        lista.removeChild(lista.firstChild);
    }
    
    const totalCarrito = sumarTotalCarrito();
    document.getElementById('total-carrito').textContent = `$${totalCarrito.toFixed(2)}`;
    
    return false;
}

function sumarTotalCarrito() {
    let totalCarrito = 0;

    const filas = document.querySelectorAll('#lista-carrito tbody tr');

    filas.forEach((fila) => {
        const precioTexto = fila.querySelector('td:nth-child(3)').textContent;
        const precio = parseFloat(precioTexto.replace('$', '').trim());
        totalCarrito += precio;
    });

    return totalCarrito;
}

const usuario={
    id:'',
    nombre:'',
    apellido:'',
    cedula:'',
    formaDePago: ''
}
let isValido=false
let isEditando=false
function accionUsuario(event){
    event.preventDefaul()
    validarCampos()
    if(isValido){
        if(!isEditando){
            agregarUsuario()
        }else{
            editarUsuario()
        }
        limpiarObj()
        limpiarCampos()
    }
}
function agregarUsuario(){
    const id=new Date().getTime()
    
    const inpNombre = document.getElementById('input-nombre').value
    const inpApellido = document.getElementById('input-apellido').value
    const inpCedula = document.getElementById('input-cedula').value

    const tBody = document.querySelector('tbody')

    const tr = document.createElement('tr')
    tr.setAttribute('id',id)

    const thId = document.createElement('th')
    thId.textContent = id

    const thNombre = document.createElement('th')
    thNombre.textContent = inpNombre
    
    const thApellido = document.createElement('th')
    thApellido.textContent = inpApellido

    const thCedula = document.createElement('th')
    thCedula.textContent = inpCedula
}
function limpiarObj(){
    usuario.id=''
    usuario.nombre=''
    usuario.apellido=''
    usuario.cedula=''
    usuario.formaDePago=''
}
function limpiarCampos(){
    document.getElementById('input-nombre').value=''
    document.getElementById('input-apellido').value=''
    document.getElementById('input-cedula').value=''
    document.getElementById('input-formaDePago').value=''
    
    isValido = false
    isEditando = false
}
function validarCampos(){
    const inpNombre = document.getElementById('input-nombre').value
    const inpApellido = document.getElementById('input-apellido').value
    const inpCedula = document.getElementById('input-cedula').value
    if(
        inpNombre === ''||
        inpApellido === ''||
        inpCedula === ''
    ) {
        alert('Se deben llenar los campos')
        isValido = false
    } else {
        isValido = true
    }

    const radios = document.querySelectorAll('input[name="pago"]');
    let formaDePagoSeleccionada = false;

    radios.forEach(radio => {
        if (radio.checked) {
            formaDePagoSeleccionada = true;
        }
    });

    if (!formaDePagoSeleccionada) {
        alert('Debe seleccionar una forma de pago');
        isValido = false;
    }

    return isValido;
}
document.querySelector('.btn').addEventListener('click', function() {
    window.location.href = '../index.html';
});