const button = document.querySelector("#create-event-button");
let ultimaLocalidad = null;

button.addEventListener("click", function (event) {
    event.preventDefault();  

    const form = document.querySelector("#agregar-evento-form");
    const formData = new FormData(form); 
    const data = {}; 
    const token = document.querySelector("#csrf_token").value;  

    formData.forEach((value, key) => {
        data[key] = value;
    });

    // Validaciones en el frontend
    const fechaInicio = new Date(data["fecha-inicio"]);
    const fechaFin = new Date(data["fecha-fin"]);
    const hoy = new Date();

    // Validación 1: La fecha de inicio debe ser mayor al día de hoy
    if (fechaInicio <= hoy) {
        alert("La fecha de inicio debe ser mayor al día de hoy.");
        return;  
    }

    // Validación 2: La fecha fin no puede ser menor que la fecha inicio
    if (fechaFin < fechaInicio) {
        alert("La fecha fin no puede ser menor que la fecha inicio.");
        return;  
    }

    // Validación 3: La localidad no puede estar vacía
    if (!data["localidad"]) {
        alert("Debes seleccionar una localidad.");
        return;  
    }

    // Validación 4: No permitir dos eventos seguidos en la misma localidad
    if (ultimaLocalidad === data["localidad"]) {
        alert("No puedes crear dos eventos seguidos en la misma localidad.");
        return;
    }

    // Hacer la solicitud POST usando fetch
    fetch(EVENTO_CREATE_URL, {
        method: 'POST',
        headers: {
            "X-CSRFToken": token,  
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)  
    })
        .then((response) => response.json())  
        .then((value) => {
            console.log(value);  
            if (value.status === "success") {
                alert("Evento creado correctamente");
                form.reset();  
            } else {
                alert("Error: " + value.message);
            }
        })
        .catch((error) => {
            console.error("Error:", error);  
            alert("Hubo un error al enviar el formulario");
        });
});

const eliminar = document.querySelectorAll('#eliminar-boton');

eliminar.forEach(button => {
    button.addEventListener('click', function() {
        const eventoId = this.getAttribute('data-id');
        console.log('ID del evento a eliminar:', eventoId);
        eliminarEvento(eventoId);
    });
});

function eliminarEvento(eventoId) {
    const token = document.querySelector("#csrf_token").value;

    fetch(DELETE_EVENTO_URL, {
        method: 'DELETE',
        headers: {
            "X-CSRFToken": token,
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ "evento_id": eventoId }) 
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
        location.reload(); 
    })
    .catch((error) => {
        alert(`Error: ${error}`);
        console.log(error);
    });

    console.log(`Eliminar evento con ID: ${eventoId}`);
}










