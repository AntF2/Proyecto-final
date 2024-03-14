document.addEventListener('DOMContentLoaded', () => {
    const carritoGuardado = JSON.parse(localStorage.getItem('carrito'));
    const lista = document.querySelector('#lista-carrito tbody');

    if (carritoGuardado) {
        carritoGuardado.forEach((elemento) => {
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
            `;
            // Agregar la fila al carrito en la página HTML
            lista.appendChild(row);
        });

        // Actualizar el total del carrito
        const totalCarrito = sumarTotalCarrito();
        document.getElementById('total-carrito').textContent = `$${totalCarrito.toFixed(2)}`;
    }
});

function sumarTotalCarrito() {
    let totalCarrito = 0;

    // Obtener todas las filas de la tabla del carrito
    const filas = document.querySelectorAll('#lista-carrito tbody tr');

    // Iterar sobre cada fila y sumar los precios
    filas.forEach((fila) => {
        // Obtener el precio de la fila y convertirlo a número
        const precioTexto = fila.querySelector('td:nth-child(3)').textContent;
        const precio = parseFloat(precioTexto.replace('$', '').trim());
        // Sumar el precio al total del carrito
        totalCarrito += precio;
    });

    return totalCarrito;
}

function generarPDF(event) {
    // Aquí puedes agregar la lógica para generar el PDF
    // Por ejemplo, puedes usar una librería como jsPDF
    // y crear el PDF basado en los datos del carrito en la tabla
    // y luego descargarlo o mostrarlo al usuario.
}


    // Función para actualizar el precio total del carrito
    function actualizarPrecioTotal() {
        const precioTotalElemento = document.getElementById('precio-total');
        const totalCarrito = sumarTotalCarrito(); // Función sumarTotalCarrito provista en tu código

        precioTotalElemento.textContent = `Precio Total: $${totalCarrito.toFixed(2)}`;
    }

    // Llama a la función para actualizar el precio total al cargar la página
    document.addEventListener('DOMContentLoaded', actualizarPrecioTotal);

