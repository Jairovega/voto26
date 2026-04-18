function validarIngreso() {
    const nombre = document.getElementById('nombre').value;
    const cedula = document.getElementById('cedula').value;

    if (nombre === "" || cedula === "") {
        alert("Por favor rellene todos los campos");
        return;
    }

    // Saludar al usuario y cambiar de pantalla
    document.getElementById('saludo-usuario').innerText = "Hola, " + nombre;
    document.getElementById('pantalla-login').classList.add('hidden');
    document.getElementById('pantalla-voto').classList.remove('hidden');
}

function registrarVoto(candidato) {
    console.log("Voto registrado para: " + candidato);
    
    // Aquí es donde luego conectarás con Google Apps Script
    // Por ahora, simulamos el final
    document.getElementById('pantalla-voto').classList.add('hidden');
    document.getElementById('pantalla-resultados').classList.remove('hidden');
    
    // Simulación de resultados
    document.getElementById('lista-resultados').innerHTML = `
        <p>✅ Tu voto por <b>${candidato}</b> ha sido procesado.</p>
        <p>Candidato A: 45%</p>
        <p>Candidato B: 30%</p>
    `;
}
