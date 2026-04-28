let candidatos = []; // Definimos la variable vacía al inicio

// Función para cargar los datos desde el archivo JSON
async function cargarCandidatos() {
    try {
        const respuesta = await fetch('candidatos.json');
        candidatos = await respuesta.json();
        console.log("Candidatos cargados con éxito");
        
        // Si el usuario no ha votado, generamos la lista en pantalla
        if (localStorage.getItem('yaVoto') !== 'true') {
            generarInterfazVotacion();
        }
    } catch (error) {
        console.error("Error al cargar el archivo JSON:", error);
    }
}

// Modificamos el window.onload para que llame a la carga de datos
window.onload = function() {
    cargarCandidatos(); // Llamada principal

    if (localStorage.getItem('yaVoto') === 'true') {
        document.getElementById('pantalla-login').classList.add('hidden');
        document.getElementById('pantalla-resultados').classList.remove('hidden');
        document.getElementById('ya-voto-msg').style.display = 'block';
        // Esperamos un momento a que carguen los datos para mostrar resultados
        setTimeout(mostrarResultados, 500); 
    }
};
