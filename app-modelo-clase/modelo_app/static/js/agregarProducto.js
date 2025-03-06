const btn = document.querySelector("#create-producto-button");
btn.addEventListener("click", function(event) {
    event.preventDefault();  // Evitar el comportamiento por defecto del formulario

    const form = document.querySelector("#agregar-producto-form");
    const formData = new FormData(form);
    const data = {}; 
    const token = document.querySelector("#csrf_token").value;  

    // Convertir los datos del formulario en un objeto
    formData.forEach((value, key) => {
        data[key] = value;
    });

    // Validación: Precio mayor a 0
    if (parseFloat(data.precio) <= 0) {
        alert("El precio debe ser mayor a 0.");
        return;  // Detener el envío
    }

    // Validación: No más de 10 productos por día
    fetch("/contar_productos_hoy/")
    .then(res => res.json())
    .then(countData => {
        if (countData.total >= 10) {
            alert("No puedes agregar más de 10 productos en un solo día.");
            return;
        }

        // Si pasa las validaciones, enviar el producto
        fetch(PRODUCT_CREATE_URL, {
            method: 'POST',
            headers: {
                "X-CSRFToken": token,
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)  
        })
        .then((res) => res.json())
        .then((value) => {
            if (value.status === 'success') {
                alert(`${value.message}`);  
                form.reset();  
            } else {
                alert(`Error: ${value.message}`);
            }
        })
        .catch((error) => {
            alert(`Error: ${error}`);
            console.log(error);
        });

    })
    .catch(error => {
        console.error("Error al verificar la cantidad de productos:", error);
        alert("Hubo un error al verificar la cantidad de productos.");
    });
});

const eliminar = document.querySelectorAll('#eliminar-boton');

eliminar.forEach(button => {
    button.addEventListener('click', function() {
        const productoId = this.getAttribute('data-id'); // Obtener el ID del producto
        console.log('ID del producto a eliminar:', productoId);
        eliminarProducto(productoId);
    });
});

function eliminarProducto(productoId) {
    const token = document.querySelector("#csrf_token").value; // Obtener token CSRF

    fetch(PRODUCT_DELETE_URL, {  // URL para eliminar productos
        method: 'DELETE',
        headers: {
            "X-CSRFToken": token,
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ "producto_id": productoId })  // Enviar el ID en JSON
    })
    .then((res) => {
        if (!res.ok) {
            throw new Error(`Error en la respuesta: ${res.status}`);
        }
        return res.json();
    })
    .then((value) => {
        alert(`${value.message}`);
        console.log(value);
        location.reload(); // Recargar la página tras eliminar
    })
    .catch((error) => {
        alert(`Error: ${error}`);
        console.log(error);
    });

    console.log(`Eliminar producto con ID: ${productoId}`);
}