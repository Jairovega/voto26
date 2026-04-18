// Datos de los candidatos extraídos del JSON
const candidatos = [
    { "id": 1, "nombre": "Elena Naranjo", "partido": "Partido Naranja", "votos": 0, "color": "#e67e22" },
    { "id": 2, "nombre": "Marco Azulejo", "partido": "Partido Azul", "votos": 0, "color": "#2980b9" },
    { "id": 3, "nombre": "Rosa Rojo", "partido": "Partido Rojo", "votos": 0, "color": "#e74c3c" },
    { "id": 4, "nombre": "Verde García", "partido": "Partido Verde", "votos": 0, "color": "#27ae60" }
];

// Función para validar ingreso
function validarIngreso() {
    const nombre = document.getElementById('nombre').value;
    const cedula = document.getElementById('cedula').value;

    if (nombre && cedula) {
        document.getElementById('pantalla-login').classList.add('hidden');
        document.getElementById('pantalla-voto').classList.remove('hidden');
        document.getElementById('saludo-usuario').innerText = `Hola, ${nombre}`;
        renderizarCandidatos();
    } else {
        alert("Por favor, complete sus datos.");
    }
}

// Genera los botones de votación dinámicamente
function renderizarCandidatos() {
    const contenedor = document.getElementById('lista-candidatos');
    contenedor.innerHTML = ""; // Limpiar

    candidatos.forEach(c => {
        const btn = document.createElement('button');
        btn.className = 'btn-voto';
        btn.style.backgroundColor = c.color;
        btn.style.color = 'white';
        btn.innerText = `${c.nombre} (${c.partido})`;
        btn.onclick = () => registrarVoto(c.id);
        contenedor.appendChild(btn);
    });

    // Botón Voto en Blanco
    const btnBlanco = document.createElement('button');
    btnBlanco.className = 'btn-voto';
    btnBlanco.innerText = "Voto en Blanco";
    btnBlanco.onclick = () => registrarVoto(null);
    contenedor.appendChild(btnBlanco);
}

function registrarVoto(id) {
    if (id !== null) {
        const candidato = candidatos.find(c => c.id === id);
        candidato.votos++;
    }
    
    // Aquí podrías enviar un evento a Google Analytics si quisieras trackear el voto:
    // gtag('event', 'voto_registrado', { 'candidato_id': id });

    mostrarResultados();
}

function mostrarResultados() {
    document.getElementById('pantalla-voto').classList.add('hidden');
    document.getElementById('pantalla-resultados').classList.remove('hidden');

    const lista = document.getElementById('lista-resultados');
    lista.innerHTML = "";

    candidatos.forEach(c => {
        const p = document.createElement('p');
        p.innerHTML = `<strong>${c.nombre}:</strong> ${c.votos} votos`;
        lista.appendChild(p);
    });
}
