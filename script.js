const candidatos = [
    { "id": 1, "nombre": "Elena Naranjo", "partido": "Partido Naranja", "votos": 0, "color": "#e67e22" },
    { "id": 2, "nombre": "Marco Azulejo", "partido": "Partido Azul", "votos": 0, "color": "#2980b9" },
    { "id": 3, "nombre": "Rosa Rojo", "partido": "Partido Rojo", "votos": 0, "color": "#e74c3c" },
    { "id": 4, "nombre": "Verde García", "partido": "Partido Verde", "votos": 0, "color": "#27ae60" }
];

// Al cargar la página, verificar si ya votó
window.onload = function() {
    if (localStorage.getItem('yaVoto') === 'true') {
        document.getElementById('pantalla-login').classList.add('hidden');
        document.getElementById('pantalla-resultados').classList.remove('hidden');
        document.getElementById('ya-voto-msg').style.display = 'block';
        mostrarResultados();
    }
};

function validarIngreso() {
    const nombre = document.getElementById('nombre').value;
    const cedula = document.getElementById('cedula').value;

    if (localStorage.getItem('yaVoto') === 'true') {
        alert("Esta cédula o dispositivo ya registró un voto.");
        return;
    }

    if (nombre && cedula) {
        document.getElementById('pantalla-login').classList.add('hidden');
        document.getElementById('pantalla-voto').classList.remove('hidden');
        document.getElementById('saludo-usuario').innerText = `Hola, ${nombre}`;
        renderizarCandidatos();
    } else {
        alert("Por favor, complete sus datos.");
    }
}

function renderizarCandidatos() {
    const contenedor = document.getElementById('lista-candidatos');
    contenedor.innerHTML = "";
    candidatos.forEach(c => {
        const btn = document.createElement('button');
        btn.className = 'btn-voto';
        btn.style.backgroundColor = c.color;
        btn.style.color = 'white';
        btn.innerText = `${c.nombre}`;
        btn.onclick = () => registrarVoto(c.id);
        contenedor.appendChild(btn);
    });
}

function registrarVoto(id) {
    // 1. Evitar múltiples clics
    if (localStorage.getItem('yaVoto') === 'true') return;

    // 2. Marcar como votado en el navegador
    localStorage.setItem('yaVoto', 'true');
    
    // 3. Registrar en la lógica (simulado)
    if (id !== null) {
        const candidato = candidatos.find(c => c.id === id);
        if(candidato) candidato.votos++;
    }

    // 4. Enviar evento a GTM/Analytics
    window.dataLayer.push({
        'event': 'voto_realizado',
        'candidato': id
    });

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
