let candidatos = [];
let cedulaActual = ""; 

async function validarIngreso() {
    const nombre = document.getElementById('nombre').value;
    const cedula = document.getElementById('cedula').value;

    if (nombre.trim() !== "" && cedula.trim() !== "") {
        if (localStorage.getItem(cedula)) {
            alert("Esta cédula ya ha registrado un voto.");
            return; 
        }

        try {
            const respuesta = await fetch('candidatos.json');
            candidatos = await respuesta.json();

            cedulaActual = cedula; 
            document.getElementById('pantalla-login').classList.add('hidden');
            document.getElementById('pantalla-voto').classList.remove('hidden');
            document.getElementById('saludo-usuario').innerText = `Hola, ${nombre.split(' ')[0]}`;
            
            cargarCandidatos();

        } catch (error) {
            alert("Hubo un error al cargar los candidatos. Asegúrate de tener el archivo candidatos.json y usar Live Server.");
            console.error("Error:", error);
        }
    } else {
        alert("Por favor, complete los campos obligatorios.");
    }
}

function cargarCandidatos() {
    const contenedor = document.getElementById('lista-candidatos');
    contenedor.innerHTML = ""; 
    
    candidatos.forEach(c => {
        const card = document.createElement('div');
        card.className = 'candidato-card';
        card.style.backgroundColor = c.color;
        card.onclick = () => registrarVoto(c.id);
        card.innerHTML = `
            <div style="text-align: left">
                <strong>${c.nombre}</strong><br>
                <small>${c.partido}</small>
            </div>
            <span style="font-size: 0.8rem; background: rgba(255,255,255,0.2); padding: 5px 10px; border-radius: 20px;">VOTAR</span>
        `;
        contenedor.appendChild(card);
    });
}

function registrarVoto(id) {
    const c = candidatos.find(cand => cand.id === id);
    
    if(confirm(`¿Está seguro de votar por ${c.nombre}?`)) {
        localStorage.setItem(cedulaActual, "Voto registrado");

        let resultados = JSON.parse(localStorage.getItem('resultadosVotacion')) || {};
        if (!resultados[id]) {
            resultados[id] = 0;
        }
        resultados[id]++; 
        localStorage.setItem('resultadosVotacion', JSON.stringify(resultados));

        document.getElementById('pantalla-voto').classList.add('hidden');
        document.getElementById('pantalla-resultados').classList.remove('hidden');
        
        mostrarResultados();
    }
}

function mostrarResultados() {
    const contenedorResultados = document.getElementById('lista-resultados');
    contenedorResultados.innerHTML = "";
    
    let resultados = JSON.parse(localStorage.getItem('resultadosVotacion')) || {};
    let totalVotos = Object.values(resultados).reduce((a, b) => a + b, 0);

    let candidatosOrdenados = [...candidatos].sort((a, b) => {
        let votosA = resultados[a.id] || 0;
        let votosB = resultados[b.id] || 0;
        return votosB - votosA;
    });

    candidatosOrdenados.forEach(c => {
        let votos = resultados[c.id] || 0;
        let porcentaje = totalVotos === 0 ? 0 : Math.round((votos / totalVotos) * 100);

        contenedorResultados.innerHTML += `
            <div style="margin-bottom: 12px;">
                <div style="display: flex; justify-content: space-between; font-size: 0.9rem; color: #2c3e50;">
                    <strong>${c.nombre}</strong>
                    <span>${votos} votos (${porcentaje}%)</span>
                </div>
                <div style="background: #ecf0f1; border-radius: 5px; height: 12px; width: 100%; margin-top: 4px; overflow: hidden;">
                    <div style="background: ${c.color}; height: 100%; width: ${porcentaje}%; transition: width 1s ease-in-out;"></div>
                </div>
            </div>
        `;
    });
}

function reiniciarVotacion() {
    if(confirm("⚠️ ¿Estás seguro de que deseas borrar TODOS los votos?")) {
        localStorage.clear();
        alert("Sistema reiniciado.");
        location.reload();
    }
}